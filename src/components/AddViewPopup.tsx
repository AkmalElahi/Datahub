import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/rootReducer";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import React from "react";
import {addView} from "../features/product/viewSlice";
import { ProductFullMetadata } from '../gen/api/api'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fafafa;

  border: 1px dashed #c4c4c4;
  border-radius: 4px;
  transition: border 0.24s ease-in-out;
`

const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 15px;
`

const TextInputGroup = styled.div`
  margin-bottom: 15px;
`

const Label = styled.label`
  input[type='radio'] {
    margin-right: 10px;
    transform: scale(1.5);
  }
  font-weight: 500;
`

const NewLabel = styled(Label)`
  display: block;
  padding-bottom: 5px;
  font-weight: 400;
`

const Dropdown = styled.select`
  flex: 1;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #ffffff;
  margin-bottom: 15px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
`

const DoneButton = styled.button`
  border-radius: 32px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  padding: 0.8rem 1rem;
  border: none;
  color: #f8f8f8;
  background: #4d9ef6;
  min-width: 110px;
  margin-left: 10px;
  cursor: pointer;
  outline: none;
`

const CancelButton = styled.button`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  padding: 0.8rem 1rem;
  border: none;
  background: transparent;
  min-width: 110px;
  margin-left: 10px;
  cursor: pointer;
  outline: none;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  padding: 2rem 0;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: flex-start;
  flex: 2;
`

interface Props {
    close: any
    productFullMetadata?: ProductFullMetadata
}

export const AddViewPopup = ({close, productFullMetadata}: Props) => {
    const dispatch = useDispatch()
    const { isLoading, error: ViewError } = useSelector(
        (state: RootState) => state.productView
    )

    let productName = productFullMetadata?.product_metadata?.name || ''

    let renderedError

    const {
        control: control,
        register: register,
        errors: errors,
        handleSubmit: handleSubmit,
    } = useForm<FormData>()

    const onSubmitSource = async (data) => {
        let result = await dispatch(
            addView(
                data.name,
                productName,
                data.tableName,
                'table'//data.viewType
            )
        )
        close()
    }

    let renderExistingTableNames = productFullMetadata?.table_full_metadata_list?.map((tabFllMtd) => (
        <option value={tabFllMtd.table_metadata?.name} key={tabFllMtd.table_metadata?.name}>
            {tabFllMtd.table_metadata?.title}
        </option>
    ))

    if (ViewError) {
        renderedError = (
            <div>
                <h1>Something went wrong...</h1>
                <div>{ViewError.toString()}</div>
            </div>
        )
    }

    return (
        <div className="modal">
            <button className="close" onClick={close}>
                &times;
            </button>
            <div className="header">Add View</div>
            <form key={1} onSubmit={handleSubmit(onSubmitSource)}>
                <div className="content">
                    <TextInputGroup>
                        <NewLabel>Product Name</NewLabel>
                        <Input
                            type="text"
                            name="productName"
                            value={productName}
                            ref={register}
                            disabled
                        />
                        <NewLabel>Table Name</NewLabel>
                        <Dropdown
                            name="tableName"
                            ref={register}
                        >
                            {renderExistingTableNames}
                        </Dropdown>
                        <NewLabel>Name</NewLabel>
                        <Input type="text" name="name" ref={register} />
                    </TextInputGroup>
                </div>

                {renderedError}

                <FlexRow>
                    <RightColumn>
                        <ButtonGroup className="actions">
                            <CancelButton
                                onClick={() => {
                                    close()
                                }}
                            >
                                Cancel
                            </CancelButton>
                            <DoneButton name="addView" type="submit" ref={register}>
                                Add
                            </DoneButton>
                        </ButtonGroup>
                    </RightColumn>
                </FlexRow>
            </form>
        </div>
    )
}
