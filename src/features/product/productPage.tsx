import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { ProductSidebar } from './productSidebar'
import { DataTab } from './dataTab'
import { ViewsTab } from './viewsTab'
import { PublishTab } from './publishTab'
import { currentTab, setCurrentTab } from './tabDisplaySlice'

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

export const ProductPage = () => {
  const { productSlug } = useParams()
  const dispatch = useDispatch()

  const { tab } = useSelector((state: RootState) => state.tabDisplay)

  const setTab = (tab: currentTab) => {
    dispatch(setCurrentTab(tab))
  }

  let renderedContent

  if (tab === 'data') {
    renderedContent = (
      <DataTab tableName="placeholder" productName={productSlug} />
    )
  } else if (tab === 'views') {
    renderedContent = <ViewsTab />
  } else if (tab === 'publish') {
    renderedContent = <PublishTab />
  }
  return (
    <FlexRow>
      <LeftColumn>
        <ProductSidebar setTab={setTab} />
      </LeftColumn>
      <RightColumn>{renderedContent}</RightColumn>
    </FlexRow>
  )
}
