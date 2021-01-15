import React from 'react'
import styled from 'styled-components'

import { TableMetadata, ColumnMetadata } from '../../api/swaggerAPI'

interface Props {
  metadata: TableMetadata
  columns: ColumnMetadata[]
}

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`

const UList = styled.ul`
  list-style-type: none;
  margin: 0;
  margin-bottom: 10px;
  padding-inline-start: 0;
`

const List = styled.li`
  display: flex;
`

const Label = styled.label`
  border: 1px solid rgba(196, 196, 196, 0.5);
  border-right: none;
  box-sizing: border-box;
  border-radius: 6px 0 0 6px;
  padding: 16px 20px;
`

const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: .375rem .75rem;
  background-color: #f8f8f8;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 0 6px 6px 0;
`

const Dropdown = styled.select`
  flex: 1;
  width: 100%;
  padding: .375rem .75rem;
  background-color: #f8f8f8;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 0 6px 6px 0;
`

export const DataProductMetadata = ({ metadata, columns }: Props) => {
  const renderedOptions = columns.map(col => (
    <option
      value={col.title}
      selected={col.is_primary_key}
    >
      {col.title}
    </option>
  ))

  return (
    <div>
    <h1>Product Table</h1>
    <FlexRow>
      <FlexColumn style={{marginRight: '10px'}}>
        <UList>
          <List>
            <Label>Name</Label>
            <Input placeholder={metadata.name} disabled />
          </List>
        </UList>
      </FlexColumn>
      <FlexColumn>
        <UList>
          <List>
            <Label>Title</Label>
            <Input placeholder={metadata.title} disabled />
          </List>
        </UList>
      </FlexColumn>
    </FlexRow>
    <FlexRow>
      <UList style={{width: '100%'}}>
        <List>
          <Label>Primary Key</Label>
          <Dropdown name="primary" id="primary">
            {renderedOptions}
          </Dropdown>
        </List>
      </UList>
    </FlexRow>
    </div>
  )
}