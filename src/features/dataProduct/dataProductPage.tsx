import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'

import { RootState } from '../../app/rootReducer'

import { DataProductHeader } from './dataProductHeader'
import { DataProductMetadata } from './dataProductMetadata'
import { DataProductSidebar } from './dataProductSidebar'
import { TableView } from '../../components/TableView'
import { fetchTable } from './tableSlice'
import { ColumnTypes } from './columnTypes'

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

const LeftColumn = styled(FlexColumn)`
  flex: 1;
  padding-left: 50px;
`

const RightColumn = styled(FlexColumn)`
  flex: 8;
  padding-right: 120px;
`

const ContentBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 1rem;
`

export const DataProductPage = () => {
  const dispatch = useDispatch()

  const {
    table,
    isLoading,
    error: tableError
  } = useSelector((state: RootState) => state.table)

  useEffect(() => {
    dispatch(fetchTable())
  }, [dispatch])

  if (tableError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{tableError.toString()}</div>
      </div>
    )
  }

  let columnHeaders : string[] = []

  if (!isLoading && !isEmpty(table)) {
    const metadata = table.column_metadata_list
    columnHeaders = metadata.map(meta => meta.title)
  }

  let renderedColumns = isLoading || isEmpty(table) ? (
    <h3>Loading...</h3>
  ) : (
    <ColumnTypes metadata={table.column_metadata_list} />
  )
  let renderedTable = isLoading || isEmpty(table) ? (
    <h3>Loading...</h3>
  ) : (
    <TableView columnHeaders={columnHeaders} data={table.value_list_list} />
  )
  let renderedMetadata = isLoading || isEmpty(table) ? (
    <h3>Loading...</h3>
  ) : (
    <DataProductMetadata 
      metadata={table.table_metadata}
      columns={table.column_metadata_list}
    />
  )
  return (
    <FlexRow>
      <LeftColumn>
        <DataProductSidebar />
      </LeftColumn>
      <RightColumn>
        <DataProductHeader />
        <ContentBox>
          {renderedMetadata}
        </ContentBox>
        <ContentBox>
          <h1>Columns</h1>
          {renderedColumns}
          {renderedTable}
        </ContentBox>
      </RightColumn>
    </FlexRow>
  );
}
