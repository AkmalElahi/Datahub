import React from 'react'
import styled from 'styled-components'

import { TableMetadata } from '../../api/swaggerAPI'

interface Props {
  metadata: TableMetadata
}

export const DataProductMetadata = ({ metadata }: Props) => {
  return (
    <div>
    <h1>Product Table</h1>
    <div>Name</div>
    </div>
  )
}