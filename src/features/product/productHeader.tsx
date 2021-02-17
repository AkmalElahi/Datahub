import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { DataSourcePopup } from '../../components/DataSourcePopup'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  padding: 2rem 0;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: flex-start;
  flex: 1;
`

const Button = styled.button`
  border-radius: 32px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  padding: 0.8rem 1rem;
  border: none;
  cursor: pointer;
  outline: none;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
`

const SaveButton = styled(Button)`
  background: none;
  border: 1px solid #272d34;
  min-width: 110px;
  font-weight: 500;
  padding: 0.8rem 1.4rem;
`

const AddDataButton = styled(Button)`
  color: #f8f8f8;
  background: #4d9ef6;
  min-width: 110px;
  margin-left: 10px;
`

const StyledPopup = styled(Popup)`
  &-content {
    border: none;
    border-radius: 8px;
    max-width: 480px;

    .modal {
      padding: 2rem;

      >.close {
        cursor: pointer;
        position: absolute;
        display: block;
        padding: 2px 5px;
        right: 20px;
        font-size: 36px;
        font-weight: 600;
        border: none;
        background-color: transparent;
        outline: none;
      }
      >.header {
        font-size: 2em;
        font-weight: 500;
        margin-bottom: 1rem;
      }
  }
`

interface Props {
  productName: string
  tableTitle: string
  register: ReturnType<typeof useForm>['register']
}

export const ProductHeader = ({ productName, tableTitle, register }: Props) => {
  return (
    <FlexRow>
      <FlexColumn>
        <h1 style={{ margin: '0' }}>{tableTitle}</h1>
      </FlexColumn>
      <FlexColumn>
        <ButtonGroup>
          <SaveButton name="submit" type="submit" ref={register}>
              Save
          </SaveButton>
          <StyledPopup
            trigger={<AddDataButton>Add Data</AddDataButton>}
            modal
          >
            {(close) => (
              <DataSourcePopup
                close={close}
                productName={productName}
                uploadType="data"
                dataType="table"
              />
            )}
          </StyledPopup>
        </ButtonGroup>
      </FlexColumn>
    </FlexRow>
  )
}
