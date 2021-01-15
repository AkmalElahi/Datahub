import React from 'react'
import styled from 'styled-components'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  padding: 1rem 0;
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
  color: #F8F8F8;
  background: #4D9EF6;
  min-width: 110px;
  margin-left: 10px;
`

export function DataProductHeader() {
  return (
    <FlexRow>
      <FlexColumn>
        <h1>Source 1</h1>
      </FlexColumn>
      <FlexColumn>
        <ButtonGroup>
        <AddDataButton>Add Data Source</AddDataButton>
        <SaveButton>Save</SaveButton>
        </ButtonGroup>
      </FlexColumn>
    </FlexRow>
  )
}