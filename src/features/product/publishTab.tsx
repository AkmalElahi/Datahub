import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { ViewPage } from '../../gen/api/api'
import { postProductMetadata, publishUnpublish, uploadHeaderImage } from './productSlice'
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

  const publishProduct = () => {
    const isPublished = currentProduct.product_full_metadata?.product_metadata?.published
    dispatch(publishUnpublish(productName, !isPublished))
  }
  const onSubmit = (data) => {
    // if (data.title !== currentProduct.product_full_metadata?.product_metadata?.title || data.description !== currentProduct.product_full_metadata?.product_metadata?.description || !!image_public_link) {

    // }
    // else {
    //   console.log("INSIDE ELSE")

    // }
    const header_image_url = data.header_image ? data.header_image : image_public_link
    let monetization = currentProduct?.product_full_metadata?.product_metadata?.monetization
    // This is because api sends error if monetization.price goes null
    console.log("INSIDE IF", data)
    if (monetization) {
      const price = monetization?.price === null ? 0 : monetization?.price;
      monetization = { ...monetization, price }
    }
    const postData = { ...currentProduct.product_full_metadata?.product_metadata, ...data, monetization, header_image_url }
    dispatch(postProductMetadata(postData))
    return null
  }

  const { product, isLoading, image_public_link, error: productError, isUploading } = useSelector(
    (state: RootState) => state.product
  )
  const uploadFile = (file) => {
    dispatch(uploadHeaderImage('image', 'true', file))
  }

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
          isUploading={isUploading}
          uploadFile={uploadFile}
          image_public_link={image_public_link}
          metadata={currentProduct.product_full_metadata?.product_metadata}
          homeCandidates={currentProduct.home_page_view_candidate_list}
          register={register}
          errors={errors}
        />
      )

  let renderedTable =
    isLoading || !currentTable || !previewPage ? (
      <h3>Loading...</h3>
    ) : (
        <TableView currentView={previewPage} isPreview={true} />
      )

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentProduct && (
          <PublishHeader
            publishProduct={publishProduct}
            productTitle={currentProduct.product_full_metadata?.product_metadata?.title || ''}
            isPublished={
              currentProduct.product_full_metadata?.product_metadata
                ?.published || false
            }
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
