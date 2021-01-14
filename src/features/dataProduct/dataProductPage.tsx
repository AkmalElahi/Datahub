import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/rootReducer'

import { fetchTable } from './tableSlice'

export const DataProductPage = () => {
  const dispatch = useDispatch()

  const {
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
    <h3>Done Loading</h3>
  )

  return (
    <div>
    {renderedTable}
    </div>
  );
}
