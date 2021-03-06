import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'

import { RootState } from '../../app/rootReducer'
import { TableFullMetadata, ViewMetadata } from '../../gen/api/api'

import { Navbar } from '../../components/Navbar'
import { ProductSidebar } from './productSidebar'
import { DataTab } from './dataTab'
import { ViewsTab } from './viewsTab'
import { PublishTab } from './publishTab'
import { fetchProduct } from './productSlice'
import { currentTab, setCurrentTab, setSource } from './tabDisplaySlice'

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

  const { source, tab } = useSelector((state: RootState) => state.tabDisplay)

  const { product, isLoading, error: ProductError } = useSelector(
    (state: RootState) => state.product
  )

  const { tablesByName } = useSelector((state: RootState) => state.tables)

  //TODO: normalize data?
  let productMetadata = product?.product_full_metadata
  let tableMetadataList: TableFullMetadata[] | undefined =
    productMetadata?.table_full_metadata_list
  let viewMetadataList: ViewMetadata[] | undefined =
    productMetadata?.view_metadata_list
  const productName = productMetadata?.product_metadata?.name
  let tableName
  let viewName
  if (tab !== 'views')
    tableName = tableMetadataList?.[source].table_metadata?.name
  else viewName = viewMetadataList?.[source].name

  useEffect(() => {
    // if product data is empty, or if url slug doesn't match product data
    if (isEmpty(product) || productSlug !== productName) {
      dispatch(fetchProduct(productSlug))
    }
  }, [dispatch, product, productSlug, productName])

  const setProductTab = useCallback(
    (tab: currentTab) => {
      dispatch(setCurrentTab(tab))
      dispatch(setSource(0, isEmpty(tablesByName)))
    },
    [dispatch]
  )
  const setProductSource = (source: number) => {
    if (tab === 'data') {
      dispatch(
        setSource(source, tableMetadataList?.[source]?.table_metadata?.name)
      )
    } else if (tab === 'views') {
      dispatch(setSource(source, viewMetadataList?.[source]?.name))
    } else dispatch(setSource(source))
  }

  let renderedContent

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
        tableName={tableName || ''}
        previewPage={product.preview_view_page}
        fullMetadata={tableMetadataList?.[source]}
      />
    )
  } else if (tab === 'views') {
    renderedContent = <ViewsTab productName={productSlug} viewName={viewName} />
  } else if (tab === 'publish') {
    renderedContent = (
      <PublishTab
        productName={productSlug || ''}
        previewPage={product.preview_view_page}
      />
    )
  }
  return (
    <React.Fragment>
      <Navbar />
      <FlexRow>
        <LeftColumn>
          <ProductSidebar
            sources={tableMetadataList}
            views={viewMetadataList}
            setSource={setProductSource}
            setTab={setProductTab}
          />
        </LeftColumn>
        <RightColumn>{renderedContent}</RightColumn>
      </FlexRow>
    </React.Fragment>
  )
}
