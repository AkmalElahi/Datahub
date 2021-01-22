import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'

import { RootState } from '../../app/rootReducer'

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
  flex: 1;
`

export const ProductListPage = () => {
  const dispatch = useDispatch()

  const {
    product_metadata_list,
    isLoading,
    error: ProductListError,
  } = useSelector((state: RootState) => state.product_metadata_list)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (ProductListError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{ProductListError.toString()}</div>
      </div>
    )
  }

  let renderedList =
    isLoading || isEmpty(product_metadata_list) ? (
      <h3>Loading...</h3>
    ) : (
      <div>test</div>
    )

  return <div>renderedList</div>
}
