import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useForm, Controller } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { uploadThenAddThunk } from '../features/product/productSlice'
import { RootState } from '../app/rootReducer'

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
const InlineInput = styled(Input)`
  margin-bottom: 0;
  margin-left: 10px;
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

const FlexLabel = styled(Label)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.5rem;
`

const RadioLabel = styled(Label)`
  display: block;
  margin-bottom: 1.5rem;
`

const NewLabel = styled(Label)`
  display: block;
  padding-bottom: 5px;
  font-weight: 400;
`

const ViewsLabel = styled(Label)`
  font-weight: 400;
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

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: flex-start;
  flex: 1;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: flex-start;
  flex: 2;
`
const AirTableRadioLabel = styled(Label)`
  display: block;
  margin:1.5rem 0;
`

interface Props {
  close: any
  productName?: string
  uploadType: 'data' | 'image'
  dataType: 'product' | 'table'
}

interface DropzoneProps {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
}

const Dropzone = ({ onChange }: DropzoneProps) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: '.csv, image/png, image/jpeg',
  })

  const acceptedFileItem = acceptedFiles.map((file) => (
    <div>
      {(file as any).path} - {file.size} bytes
    </div>
  ))

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps({ onChange })} />
      <p>Drag & drop file here, or click to select file</p>
      <aside>
        <p>{acceptedFileItem}</p>
      </aside>
    </Container>
  )
}

export const DataSourcePopup = ({
  close,
  uploadType,
  dataType,
  productName,
}: Props) => {
  const dispatch = useDispatch()
  const { isLoading, error: ProductError } = useSelector(
    (state: RootState) => state.product
  )
  let navigate = useNavigate()

  let checked
  let renderedError

  const {
    control: control2,
    register: register2,
    errors: errors2,
    watch,
    handleSubmit: handleSubmit2,
  } = useForm<FormData>()
  const watchAirTable = watch('airTable')
  const onSubmitSource = async (data) => {
    let result = await dispatch(
      uploadThenAddThunk(
        productName ? productName : data.productName,
        data.tableName,
        uploadType,
        dataType,
        data.fileRadio,
        data.addViews ? 'true' : 'false',
        data.fileRadio === 'link' ? data.newLink : undefined,
        data.fileRadio === 'upload' ? data.file : undefined,
        data.airTable,
        data.baseId,
        data.apiKey
      )
    )
    close()
    if (!productName) navigate('/' + data.productName)
  }
  if (ProductError) {
    renderedError = (
      <div>
        <h1>Something went wrong...</h1>
        <div>{ProductError.toString()}</div>
      </div>
    )
  }

  return (
    <div className="modal">
      <button className="close" onClick={close}>
        &times;
      </button>
      <div className="header">Add Data Source</div>
      <form key={1} onSubmit={handleSubmit2(onSubmitSource)}>
        <div className="content">
          <TextInputGroup>
            {dataType === 'product' && <NewLabel>Product Name</NewLabel>}
            {productName ? (
              <Input
                type="text"
                name="productName"
                value={productName}
                ref={register2}
                disabled
              />
            ) : (
                <Input type="text" name="productName" ref={register2} />
              )}

            <NewLabel>Table Name</NewLabel>
            <Input type="text" name="tableName" ref={register2} />
          </TextInputGroup>
          <FlexLabel>
            <input type="radio" name="fileRadio" value="link" ref={register2} />
            Link
            <InlineInput name="newLink" ref={register2} />
          </FlexLabel>
          <RadioLabel>
            <input
              type="radio"
              name="fileRadio"
              value="upload"
              ref={register2}
            />
            Upload
          </RadioLabel>
          <Controller
            name="file"
            control={control2}
            defaultValue=""
            render={({ onChange }) => (
              <Dropzone onChange={(e) => onChange(e.target.files?.[0])} />
            )}
          />
          <AirTableRadioLabel>
            <input
              type="radio"
              name="airTable"
              value="isAirTable"
              ref={register2}
            />
            Airtable
          </AirTableRadioLabel>
          {watchAirTable && (<>
            <NewLabel>Base ID</NewLabel>
            <Input type="text" name="baseId" ref={register2} />
            <NewLabel>API Key</NewLabel>
            <Input type="text" name="apiKey" ref={register2} />
          </>)}

        </div>

        {renderedError}

        <FlexRow>
          <LeftColumn>
            <ViewsLabel>
              <input
                type="checkbox"
                name="addViews"
                style={{ marginRight: '10px' }}
                ref={register2}
                value="true"
                defaultChecked={true}
              />
              Add views
            </ViewsLabel>
          </LeftColumn>
          <RightColumn>
            <ButtonGroup className="actions">
              <CancelButton
                onClick={() => {
                  close()
                }}
              >
                Cancel
              </CancelButton>
              <DoneButton name="entitySubmit" type="submit" ref={register2}>
                Upload
              </DoneButton>
            </ButtonGroup>
          </RightColumn>
        </FlexRow>
      </form>
    </div>
  )
}
