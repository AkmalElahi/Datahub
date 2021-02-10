import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { ViewPage } from '../../gen/api/api'
import { publishUnpublish } from './productSlice'
import { PublishHeader } from './publishHeader'
import { PublishMetadataSection } from './publishMetadata'
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
  previewPage: ViewPage | undefined
}

export const PublishTab = ({ productName, previewPage }: Props) => {
  const dispatch = useDispatch()

  const { register, errors, handleSubmit } = useForm<FormData>()

  const onSubmit = (data) => {
    const isPublished =
      currentProduct.product_full_metadata?.product_metadata?.published
    dispatch(publishUnpublish(productName, !isPublished))
  }

  const { product, isLoading, error: productError } = useSelector(
    (state: RootState) => state.product
  )

  let currentTable = previewPage
  let currentProduct = product

  let columnHeaders: (string | null | undefined)[] = []

  if (!isLoading && currentTable) {
    const metadata = currentTable.column_metadata_list
    if (metadata) {
      columnHeaders = metadata.map((meta) => meta.title)
    }
  }

  let renderedMetadata =
    isLoading || !currentProduct || !currentTable ? (
      <h3>Loading...</h3>
    ) : (
      <PublishMetadataSection
        metadata={currentProduct.product_full_metadata?.product_metadata}
        homeCandidates={currentProduct.home_page_view_candidate_list}
        register={register}
        errors={errors}
      />
    )

  let renderedTable =
    isLoading || !currentTable ? (
      <h3>Loading...</h3>
    ) : (
      <TableView
        columnHeaders={columnHeaders}
        data={currentTable.value_list_list}
        isPreview={true}
      />
    )

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentProduct && (
          <PublishHeader
            isPublished={
              currentProduct.product_full_metadata?.product_metadata
                ?.published || false
            }
            register={register}
          />
        )}
        <ContentBox>{renderedMetadata}</ContentBox>
      </form>
      <ContentBox>
        <h2>Preview</h2>
        {renderedTable}
      </ContentBox>
    </React.Fragment>
  )
}
