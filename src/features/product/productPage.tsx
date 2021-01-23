import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../app/rootReducer'
import { TableFullMetadata } from 'typescript-axios'

import { ProductSidebar } from './productSidebar'
import { DataTab } from './dataTab'
import { ViewsTab } from './viewsTab'
import { PublishTab } from './publishTab'
import { fetchProduct } from './productSlice'
import { currentTab, setCurrentTab, setCurrentSource } from './tabDisplaySlice'

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

  const { product, isLoading, error: ProductError } = useSelector(
    (state: RootState) => state.product
  )

  useEffect(() => {
    dispatch(fetchProduct(productSlug))
  }, [dispatch, productSlug])

  const setTab = useCallback(
    (tab: currentTab) => dispatch(setCurrentTab(tab)),
    [dispatch]
  )

  const setSource = useCallback(
    (source: number) => dispatch(setCurrentSource(source)),
    [dispatch]
  )

  let renderedContent
  //TODO: normalize data?
  const productMetadata = product?.product_full_metadata
  const tableMetadataList: TableFullMetadata[] | undefined =
    productMetadata?.table_full_metadata_list
  const defaultTableName = tableMetadataList?.[0].table_metadata

  if (ProductError) {
    renderedContent = (
      <div>
        <h1>Something went wrong...</h1>
        <div>{ProductError.toString()}</div>
      </div>
    )
  } else if (tab === 'data') {
    renderedContent = (
      <DataTab
        productName={productSlug}
        tableName={defaultTableName?.name || ''}
      />
    )
  } else if (tab === 'views') {
    renderedContent = <ViewsTab />
  } else if (tab === 'publish') {
    renderedContent = <PublishTab />
  }
  return (
    <FlexRow>
      <LeftColumn>
        <ProductSidebar
          sources={tableMetadataList}
          setSource={setSource}
          setTab={setTab}
        />
      </LeftColumn>
      <RightColumn>{renderedContent}</RightColumn>
    </FlexRow>
  )
}
