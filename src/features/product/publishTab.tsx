import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { PublishHeader } from './publishHeader'
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

export const PublishTab = ({ productName, tableName }: Props) => {
  const dispatch = useDispatch()

  //const { register, errors, handleSubmit } = useForm<FormData>()

  const { tablesByName, isLoading, error: tableError } = useSelector(
    (state: RootState) => state.tables
  )

  let currentTable = Object.values(tablesByName)[0]

  useEffect(() => {
    if (!currentTable && tableName !== '') {
      dispatch(fetchTable(productName, tableName))
    }
  }, [dispatch, currentTable, productName, tableName])

  if (tableError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{tableError.toString()}</div>
      </div>
    )
  }

  let columnHeaders: (string | undefined)[] = []

  if (!isLoading && currentTable) {
    const metadata = currentTable.column_metadata_list
    if (metadata) {
      columnHeaders = metadata.map((meta) => meta.title)
    }
  }

  let renderedTable =
    isLoading || !currentTable ? (
      <h3>Loading...</h3>
    ) : (
      <TableView
        columnHeaders={columnHeaders}
        data={currentTable.value_list_list}
      />
    )

  return (
    <React.Fragment>
      {currentTable && <PublishHeader />}
      <ContentBox>{renderedTable}</ContentBox>
    </React.Fragment>
  )
}
