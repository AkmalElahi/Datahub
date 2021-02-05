import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'
import {} from 'typescript-axios'

import { ViewNavbar } from '../../components/ViewNavbar'
import { fetchProductView } from './productViewSlice'
import { TableView } from '../../components/TableView'
import { ProductViewHeader } from './productViewHeader'
import {
  currentTab,
  setCurrentTab,
  setCurrentSource,
} from '../product/tabDisplaySlice'

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

export const ProductViewPage = () => {
  const { productSlug } = useParams()
  const dispatch = useDispatch()

  const { tab } = useSelector((state: RootState) => state.tabDisplay)

  const { productView, isLoading, error: ProductViewError } = useSelector(
    (state: RootState) => state.productView
  )

  useEffect(() => {
    if (isEmpty(productView))
      dispatch(fetchProductView(productSlug, { offset: 0, limit: 100 }))
  }, [dispatch, productView, productSlug])

  useEffect(() => {
    if (!isEmpty(productView))
      dispatch(
        setCurrentTab({
          tab:
            productView.top_level_nav_view_metadata_list?.[0].table_view
              ?.title || '',
        })
      )
  }, [productView])

  const setTab = useCallback(
    (tab: currentTab) => dispatch(setCurrentTab(tab)),
    [dispatch]
  )

  let renderedContent
  let viewMetadata = productView.view_metadata
  let columnHeaders
  let viewTitles = productView.top_level_nav_view_metadata_list?.map(
    (view) => view?.table_view?.title
  )
  console.log(viewTitles)

  if (ProductViewError) {
    renderedContent = (
      <div>
        <h1>Something went wrong...</h1>
        <div>{ProductViewError.toString()}</div>
      </div>
    )
  } else if (viewMetadata?.table_view) {
    columnHeaders = viewMetadata?.table_view?.column_view_list?.map(
      (c) => c.title
    )
    renderedContent = (
      <TableView
        columnHeaders={columnHeaders}
        data={productView.value_list_list}
        isPreview={false}
      />
    )
  }

  return (
    <React.Fragment>
      <ViewNavbar />
      <FlexRow>
        <LeftColumn>
          <div>Filters</div>
        </LeftColumn>
        <RightColumn>
          <ProductViewHeader viewTitles={viewTitles} setTab={setTab} />
          {renderedContent}
        </RightColumn>
      </FlexRow>
    </React.Fragment>
  )
}
