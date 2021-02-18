import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { ViewHeader } from './viewHeader'
import { ViewMetadataSection } from './viewMetadata'
import { CardView } from '../../components/CardView'
import { TableView } from '../../components/TableView'
import { fetchView } from './viewSlice'

const ContentBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 1rem;
`
type FormData = {
  title: string
  subtitle: string
  description: string
  title_column: string
  subtitle_column: string
  description_column: string
  image_url_column: string
  top_level_nav: boolean
}

interface Props {
  productName: string
  viewName: string
}

export const ViewsTab = ({ productName, viewName }: Props) => {
  const dispatch = useDispatch()
  const { register, reset, errors, handleSubmit } = useForm<FormData>()
  const {
    viewsByName,
    draftMetadata,
    isLoading,
    error: viewError,
  } = useSelector((state: RootState) => state.views)

  let currentView = viewsByName[viewName]

  useEffect(() => {
    if (!currentView) {
      dispatch(fetchView(productName, viewName))
    }
  }, [dispatch, currentView, productName, viewName])

  if (viewError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{viewError.toString()}</div>
      </div>
    )
  }

  let renderedTable

  if (isLoading) {
    renderedTable = <h3>Loading...</h3>
  } else {
    if (currentView?.view_metadata?.card_view) {
      renderedTable = (
        <CardView
          currentView={currentView.preview_view_page}
          isPreview={true}
        />
      )
    } else if (currentView?.view_metadata?.table_view) {
      renderedTable = (
        <TableView
          currentView={currentView.preview_view_page}
          isPreview={true}
        />
      )
    }
  }

  let renderedMetadata =
    isLoading || !currentView ? (
      <h3>Loading...</h3>
    ) : (
      <ViewMetadataSection
        metadata={draftMetadata.metadata}
        possibleViews={currentView.view_possible_for_view}
        product_full_metadata={currentView.product_full_metadata}
        reset={reset}
        register={register}
      />
    )

  return (
    <React.Fragment>
      {currentView && (
        <ViewHeader
          viewType={
            currentView.view_metadata?.card_view ? 'Card View' : 'Table View'
          }
          productTitle={currentView.view_metadata?.product_name || ''}
          draftMetadata={draftMetadata}
          handleSubmit={handleSubmit}
        />
      )}
      <ContentBox>{renderedMetadata}</ContentBox>
      <ContentBox>{renderedTable}</ContentBox>
    </React.Fragment>
  )
}
