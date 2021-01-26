import React from 'react'
import styled from 'styled-components'

import { Grid } from 'gridjs-react'
import 'gridjs/dist/theme/mermaid.css'

interface Props {
  columnHeaders: (string | null | undefined)[]
  data: string[][] | undefined
}

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

  table.gridjs-table {
    table-layout: auto;
  }
`

export const TableView = ({ columnHeaders, data }: Props) => {
  return (
    <div>
      <GridContainer>
        <Grid data={data} columns={columnHeaders} />
      </GridContainer>
    </div>
  )
}
