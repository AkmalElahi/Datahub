import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ProductMetadataList } from 'typescript-axios'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

const FlexColumn = styled.div`
  flex: 0 50%;
  margin-bottom: 2rem;
  :nth-child(odd) {
    padding-right: 2rem;
  }
`

const ProductBox = styled.div`
  background: #362643;
  mix-blend-mode: multiply;
  opacity: 0.7;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  color: #ffffff;
  font-size: 2em;
  font-weight: bold;
  padding: 5rem 2rem;
`

interface Props {
  products: ProductMetadataList
}

export const ProductList = ({ products }: Props) => {
  let renderedProducts: JSX.Element[] = []
  for (const [k, product] of Object.entries(products)) {
    renderedProducts.push(
      <FlexColumn>
        <Link to={'/' + product.name || ''} key={product.name || ''}>
          <ProductBox>{product.title}</ProductBox>
        </Link>
      </FlexColumn>
    )
  }

  return renderedProducts ? <FlexRow>{renderedProducts}</FlexRow> : <div></div>
}
