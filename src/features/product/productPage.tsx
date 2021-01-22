import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { ProductSidebar } from './productSidebar'
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

  const setTab = (tab: currentTab) => {
    dispatch(setCurrentTab(tab))
  }

  return (
    <FlexRow>
      <LeftColumn>
        <ProductSidebar setTab={setTab} />
      </LeftColumn>
      <RightColumn></RightColumn>
    </FlexRow>
  )
}
