import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { ViewNavbar } from '../../components/ViewNavbar'
import { fetchProductHome, fetchProductView } from './productViewSlice'
import { CardView } from '../../components/CardView'
import { TableView } from '../../components/TableView'
import { ProductViewHeader } from './productViewHeader'
import { currentTab, setCurrentTab } from '../product/tabDisplaySlice'

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

  const {
    productViewsByName,
    isLoading,
    error: ProductViewError,
  } = useSelector((state: RootState) => state.productView)

  let currentView = productViewsByName[tab]

  useEffect(() => {
    dispatch(fetchProductHome(productSlug, { offset: 0, limit: 100 }))
  }, [dispatch])

  const setTab = useCallback(
    (tab: currentTab) => {
      dispatch(setCurrentTab(tab))
      if (!productViewsByName[tab.tab]) {
        dispatch(
          fetchProductView(productSlug, tab.tab, undefined, undefined, {
            display_params: { offset: 0, limit: 100 },
          })
        )
      }
    },
    [dispatch, productViewsByName]
  )

  let renderedContent
  let viewTitles
  if (!isEmpty(productViewsByName)) {
    viewTitles = productViewsByName[
      Object.keys(productViewsByName)[0]
    ].top_level_nav_view_metadata_list?.map((view) => ({
      title: view.table_view?.title || '',
      name: view.name || ''
    }))
  }

  if (ProductViewError) {
    renderedContent = (
      <div>
        <h1>Something went wrong...</h1>
        <div>{ProductViewError.toString()}</div>
      </div>
    )
  } else if (currentView?.view_metadata?.table_view) {
    renderedContent = <TableView currentView={currentView} isPreview={false} />
  } else if (currentView?.view_metadata?.card_view) {
    renderedContent = <CardView currentView={currentView} isPreview={false} />
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
