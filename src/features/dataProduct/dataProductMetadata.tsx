import React from 'react'
import styled from 'styled-components'

import { TableMetadata } from '../../api/swaggerAPI'

interface Props {
  metadata: TableMetadata
}

const ContentBox = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 1rem;
`
export const DataProductMetadata = ({ metadata }: Props) => {
  return (
    <ContentBox>
    <h1>Product Table</h1>
    <div>Name { metadata.name }</div>
    </ContentBox>
  )
}