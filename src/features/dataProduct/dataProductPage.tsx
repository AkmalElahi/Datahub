import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { DataProductHeader } from './dataProductHeader'
import { DataProductMetadata } from './dataProductMetadata'
import { TableView } from '../../components/TableView'
import { fetchTable } from './tableSlice'

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
  let renderedMetadata = isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <DataProductMetadata metadata={table.table_metadata} />
  )
  return (
    <FlexRow>
      <LeftColumn>
        <div>View</div>
      </LeftColumn>
      <RightColumn>
        <DataProductHeader />
        {renderedMetadata}
        {renderedTable}
      </RightColumn>
    </FlexRow>
  );
}
