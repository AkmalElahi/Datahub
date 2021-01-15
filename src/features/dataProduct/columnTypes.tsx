import React from 'react'
import styled from 'styled-components'

import { ColumnMetadata } from '../../api/swaggerAPI'

interface Props {
  metadata: ColumnMetadata[]
}

const ColumnsContainer = styled.div`
  padding-bottom: 2rem;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin-bottom: 10px;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  :not(:first-child) {
    margin-left: 10px;
  }
`

const ColumnBox = styled.div`
  background: #f8f8f8;
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 6px;
  padding: 1rem;
`

const ColumnBoxHeader = styled(ColumnBox)`
  background: #ffffff;
`
const EntityBox = styled(ColumnBox)`
  background: rgba(77, 158, 246, 0.06);
  border: 1px solid ${props => props.theme.primaryColor};
  color: ${props => props.theme.primaryColor};
`

const EntityBoxHeader = styled(EntityBox)`
  background: #ffffff;
`

const DATA_TYPES = {0: 'int', 1: 'float', 2: 'string', 3: 'boolean'}

export const ColumnTypes = ({ metadata }: Props) => {
  console.log(metadata)
  let renderedNames = metadata.map(meta => (
    <FlexColumn key={meta.column_num}>
      <ColumnBox>
        {meta.name}
      </ColumnBox>
    </FlexColumn>
  ))
  let renderedTitles = metadata.map(meta => (
    <FlexColumn key={meta.column_num}>
      <ColumnBox>
        {meta.title}
      </ColumnBox>
    </FlexColumn>
  ))
  let renderedDataTypes = metadata.map(meta => (
    <FlexColumn key={meta.column_num}>
      <ColumnBox>
        {DATA_TYPES[meta.data_type]}
      </ColumnBox>
    </FlexColumn>
  ))
  let renderedEntities = metadata.map(meta => (
    <FlexColumn key={meta.column_num}>
      <EntityBox>
        {meta.entity_name ? meta.entity_name : 'null'}
      </EntityBox>
    </FlexColumn>
  ))
  return (
    <ColumnsContainer>
      <FlexRow>
        <FlexColumn>
          <ColumnBoxHeader>
            Name
          </ColumnBoxHeader>
        </FlexColumn>
          {renderedNames}
      </FlexRow>
       <FlexRow>
        <FlexColumn>
          <ColumnBoxHeader>
            Title
          </ColumnBoxHeader>
        </FlexColumn>
          {renderedTitles}
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          <ColumnBoxHeader>
            Data Type
          </ColumnBoxHeader>
        </FlexColumn>
          {renderedDataTypes}
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          <EntityBoxHeader>
            Entity
          </EntityBoxHeader>
        </FlexColumn>
          {renderedEntities}
      </FlexRow>
    </ColumnsContainer>
  )
}