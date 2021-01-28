import React from 'react'
import styled from 'styled-components'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import { ColumnMetadata } from 'typescript-axios'
import { EntityPopup } from '../../components/EntityPopup'

interface Props {
  metadata: ColumnMetadata[] | undefined
  table: string
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
  border: 1px solid ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};
  position: relative;
`
const Ellipses = styled.div`
  cursor: pointer;
  :after {
    content: '•••';
    position: absolute;
    top: 50%;
    left: 90%;
    transform: translate(-50%, -50%) rotate(90deg);
    font-size: 20px;
    letter-spacing: 2px;
    margin-top: 2px;
  }
`

const EntityBoxHeader = styled(EntityBox)`
  background: #ffffff;
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

const DATA_TYPES = { 0: 'int', 1: 'float', 2: 'string', 3: 'boolean' }

export const ColumnTypes = ({ metadata, table }: Props) => {
  let renderedNames = metadata?.map((meta) => (
    <FlexColumn key={meta.column_num}>
      <ColumnBox>{meta.name}</ColumnBox>
    </FlexColumn>
  ))

  let renderedTitles = metadata?.map((meta) => (
    <FlexColumn key={meta.column_num}>
      <ColumnBox>{meta.title}</ColumnBox>
    </FlexColumn>
  ))

  let renderedDataTypes = metadata?.map((meta) => (
    <FlexColumn key={meta.column_num}>
      <ColumnBox>
        {meta.data_type ? DATA_TYPES[meta.data_type] : 'unknown'}
      </ColumnBox>
    </FlexColumn>
  ))

  let renderedEntities = metadata?.map((meta, i) => (
    <FlexColumn key={meta.column_num}>
      <EntityBox>
        {meta.entity_name || 'none'}
        <StyledPopup trigger={<Ellipses />} modal>
          {(close) => (
            <EntityPopup
              close={close}
              entities={meta.entity_name_candidate_list}
              table={table}
              index={i}
            />
          )}
        </StyledPopup>
      </EntityBox>
    </FlexColumn>
  ))

  return (
    <ColumnsContainer>
      <FlexRow>
        <FlexColumn>
          <ColumnBoxHeader>Name</ColumnBoxHeader>
        </FlexColumn>
        {renderedNames}
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          <ColumnBoxHeader>Title</ColumnBoxHeader>
        </FlexColumn>
        {renderedTitles}
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          <ColumnBoxHeader>Data Type</ColumnBoxHeader>
        </FlexColumn>
        {renderedDataTypes}
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          <EntityBoxHeader>Entity</EntityBoxHeader>
        </FlexColumn>
        {renderedEntities}
      </FlexRow>
    </ColumnsContainer>
  )
}
