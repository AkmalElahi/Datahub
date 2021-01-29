import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'

import { RootState } from '../../app/rootReducer'

import { ProductList } from './productList'
import { fetchProducts } from './productListSlice'

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
  flex: 0 50%;
`

const LeftColumn = styled(FlexColumn)`
  flex: 1;
  padding-left: 50px;
`

const RightColumn = styled(FlexColumn)`
  flex: 8;
  padding-right: 120px;
`

export const ProductListPage = () => {
  const dispatch = useDispatch()

  const {
    productMetadataList,
    isLoading,
    error: ProductListError,
  } = useSelector((state: RootState) => state.productMetadataList)

  useEffect(() => {
    if (isEmpty(productMetadataList)) {
      dispatch(fetchProducts())
    }
  }, [dispatch, productMetadataList])

  if (ProductListError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{ProductListError.toString()}</div>
      </div>
    )
  }

  let renderedList =
    isLoading || isEmpty(productMetadataList) ? (
      <h3>Loading...</h3>
    ) : (
      <ProductList products={productMetadataList} />
    )

  return (
    <FlexRow>
      <LeftColumn></LeftColumn>
      <RightColumn>{renderedList}</RightColumn>
    </FlexRow>
  )
}
