import React from 'react'
import styled from 'styled-components'

import { Table } from '../api/swaggerAPI'

interface Props {
  data: Table
}

const ContentBox = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 1rem;
`

export const TableView = ({ data }: Props) => {
  const renderedTable = data
  return (
    <ContentBox>
      <h1>Columns</h1>
    </ContentBox>
   )
}
