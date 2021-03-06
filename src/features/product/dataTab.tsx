import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { TableFullMetadata, ViewPage } from '../../gen/api/api'
import { RootState } from '../../app/rootReducer'

import { ProductHeader } from './productHeader'
import { ProductMetadataSection } from './productMetadata'
import { ColumnTypes } from './columnTypes'
import { TableView } from '../../components/TableView'
import { fetchTable, postTableMetadata } from './tableSlice'
import { applyEntities } from '../../util/applyEntities'

const ContentBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 1rem;
`

type FormData = {
  title: string
  description: string
}

interface Props {
  productName: string
  tableName: string
  previewPage: ViewPage | undefined
  fullMetadata: TableFullMetadata | undefined
}

export const DataTab = ({
  productName,
  tableName,
  previewPage,
  fullMetadata,
}: Props) => {
  const dispatch = useDispatch()

  const { register, errors, handleSubmit } = useForm<FormData>()

  const onSubmit = (data) => {
    let newMetadata = applyEntities(fullMetadata, draftEntities)
    newMetadata.table_metadata.title = data.title
    newMetadata.table_metadata.description = data.description
    dispatch(postTableMetadata(newMetadata, draftEntities, tableName))
  }

  const {
    tablesByName,
    draftEntities,
    isLoading,
    error: tableError,
  } = useSelector((state: RootState) => state.tables)

  let currentTable = tablesByName[tableName]

  useEffect(() => {
    if (!currentTable) {
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

  let columnHeaders: (string | null | undefined)[] = []

  if (!isLoading && currentTable) {
    const metadata = currentTable.column_metadata_list
    if (metadata) {
      columnHeaders = metadata.map((meta) => meta.title)
    }
  }

  let renderedColumns =
    isLoading || !currentTable ? (
      <h3>Loading...</h3>
    ) : (
      <ColumnTypes
        metadata={currentTable.column_metadata_list}
        entities={draftEntities}
        entityCandidates={currentTable.entity_metadata_candidate_list_list}
        table={tableName}
      />
    )
  let renderedTable =
    isLoading || !currentTable ? (
      <h3>Loading...</h3>
    ) : (
      <TableView currentView={previewPage} isPreview={true} />
    )
  let renderedMetadata =
    isLoading || !currentTable ? (
      <h3>Loading...</h3>
    ) : (
      <ProductMetadataSection
        metadata={currentTable.table_metadata}
        columns={currentTable.column_metadata_list}
        fullMetadata={fullMetadata}
        register={register}
        errors={errors}
      />
    )

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentTable && (
          <ProductHeader
            productName={productName}
            tableTitle={currentTable.table_metadata?.title || ''}
            register={register}
          />
        )}
        <ContentBox>{renderedMetadata}</ContentBox>
      </form>
      <ContentBox>
        <h2>Columns</h2>
        {renderedColumns}
        {renderedTable}
      </ContentBox>
    </React.Fragment>
  )
}
