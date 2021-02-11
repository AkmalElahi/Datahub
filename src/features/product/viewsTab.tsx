import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { ViewHeader } from './viewHeader'
import { ViewMetadataSection } from './viewMetadata'
import { ColumnTypes } from './columnTypes'
import { CardView } from '../../components/CardView'
import { TableView } from '../../components/TableView'
import { fetchView, postViewMetadata } from './viewSlice'

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
}

interface Props {
  productName: string
  viewName: string
}

export const ViewsTab = ({ productName, viewName }: Props) => {
  const dispatch = useDispatch()

  const { register, errors, handleSubmit } = useForm<FormData>()

  const onSubmit = (data) => {
    if (draftMetadata.edited) {
      dispatch(postViewMetadata(draftMetadata.metadata))
    }
  }

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

  let columnHeaders

  if (currentView?.preview_view_page?.column_metadata_list)
    columnHeaders = currentView?.preview_view_page?.column_metadata_list?.map(
      (c) => c.title
    )

  let renderedTable

  if (isLoading) {
    renderedTable = <h3>Loading...</h3>
  } else {
    if (currentView?.view_metadata?.card_view) {
      renderedTable = (
        <CardView
          columnHeaders={columnHeaders}
          data={currentView.preview_view_page?.value_list}
          isPreview={true}
        />
      )
    } else if (currentView?.view_metadata?.table_view) {
      renderedTable = <TableView currentView={currentView} isPreview={true} />
    }
  }

  let renderedMetadata =
    isLoading || !currentView ? (
      <h3>Loading...</h3>
    ) : (
      <ViewMetadataSection
        metadata={currentView.view_metadata}
        possibleViews={currentView.view_possible_for_view}
        register={register}
        errors={errors}
      />
    )

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentView && (
          <ViewHeader
            viewType={
              currentView.view_metadata?.card_view ? 'Card View' : 'Table View'
            }
            productTitle={currentView.view_metadata?.product_name || ''}
            register={register}
          />
        )}
        <ContentBox>{renderedMetadata}</ContentBox>
      </form>
      <ContentBox>{renderedTable}</ContentBox>
    </React.Fragment>
  )
}
