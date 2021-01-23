import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'

import { RootState } from '../../app/rootReducer'

import { ProductHeader } from './productHeader'
import { ProductMetadata } from './productMetadata'
import { ColumnTypes } from './columnTypes'
import { TableView } from '../../components/TableView'
import { fetchTable } from './tableSlice'

const ContentBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 1rem;
`

interface Props {
  productName: string
  tableName: string
}

export const DataTab = ({ productName, tableName }: Props) => {
  const dispatch = useDispatch()

  const { table, isLoading, error: tableError } = useSelector(
    (state: RootState) => state.table
  )

  useEffect(() => {
    if (isEmpty(table) || table.table_metadata?.name !== tableName) {
      dispatch(fetchTable(productName, tableName))
    }
  }, [dispatch, table, productName, tableName])

  if (tableError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{tableError.toString()}</div>
      </div>
    )
  }

  let columnHeaders: (string | undefined)[] = []

  if (!isLoading && !isEmpty(table)) {
    const metadata = table.column_metadata_list
    if (metadata) {
      columnHeaders = metadata.map((meta) => meta.title)
    }
  }

  let renderedColumns =
    isLoading || isEmpty(table) ? (
      <h3>Loading...</h3>
    ) : (
      <ColumnTypes metadata={table.column_metadata_list} />
    )
  let renderedTable =
    isLoading || isEmpty(table) ? (
      <h3>Loading...</h3>
    ) : (
      <TableView columnHeaders={columnHeaders} data={table.value_list_list} />
    )
  let renderedMetadata =
    isLoading || isEmpty(table) ? (
      <h3>Loading...</h3>
    ) : (
      <ProductMetadata
        metadata={table.table_metadata}
        columns={table.column_metadata_list}
      />
    )

  return (
    <React.Fragment>
      <ProductHeader tableTitle={table.table_metadata?.title || ''} />
      <ContentBox>{renderedMetadata}</ContentBox>
      <ContentBox>
        <h1>Columns</h1>
        {renderedColumns}
        {renderedTable}
      </ContentBox>
    </React.Fragment>
  )
}
