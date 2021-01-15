import React from 'react'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'

import { Grid } from 'gridjs-react'
import 'gridjs/dist/theme/mermaid.css'

import { Table } from '../api/swaggerAPI'

interface Props {
  data: Table
}

const ContentBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 1rem;
`

const GridContainer = styled.div`
  .gridjs-wrapper {
    border: 1px solid rgba(196, 196, 196, 0.5);
    box-shadow: none;
  }

  th.gridjs-th {
    background-color: #ffffff;
    text-transform: uppercase;
    border: none;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  td.gridjs-td {
    border: none;
    border-bottom: 1px solid rgba(196, 196, 196, 0.5);
    border-top: 1px solid rgba(196, 196, 196, 0.5);
  }
`

export const TableView = ({ data }: Props) => {
  let columnHeaders;

  if (!isEmpty(data)) {
    columnHeaders = data.column_metadata_list.map(
      meta => meta.title)
  }

  return (
    <ContentBox>
      <h1>Columns</h1>
      {!isEmpty(data) && 
        <GridContainer>
          <Grid
            data={data.value_list_list}
            columns={columnHeaders}
         />
       </GridContainer>}
    </ContentBox>
   )
}
