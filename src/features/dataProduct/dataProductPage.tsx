import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/rootReducer'

import { DataProductHeader } from './dataProductHeader'
import { DataProductMetadata } from './dataProductMetadata'
import { TableView } from '../../components/TableView'
import { fetchTable } from './tableSlice'

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
  let renderedTable = isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <TableView data={table} />
  )

  return (
    <div>
    <DataProductHeader />
    <DataProductMetadata />
    {renderedTable}
    </div>
  );
}
