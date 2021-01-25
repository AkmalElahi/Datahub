import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

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

const AddDataButton = styled(Button)`
  background: none;
  border: 1px solid #272d34;
  max-width: 180px;
  font-weight: 500;
  padding: 0.8rem 1.4rem;
`

const SaveButton = styled(Button)`
  color: #f8f8f8;
  background: #4d9ef6;
  min-width: 110px;
  margin-left: 10px;
`

interface Props {
  tableTitle: string
  register: ReturnType<typeof useForm>['register']
}

export const ProductHeader = ({ tableTitle, register }: Props) => {
  return (
    <FlexRow>
      <FlexColumn>
        <h1 style={{ margin: '0' }}>{tableTitle}</h1>
      </FlexColumn>
      <FlexColumn>
        <ButtonGroup>
          <AddDataButton>Add Data Source</AddDataButton>
          <SaveButton type="submit" ref={register}>
            Save
          </SaveButton>
        </ButtonGroup>
      </FlexColumn>
    </FlexRow>
  )
}
