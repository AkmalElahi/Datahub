import React from 'react'
import styled from 'styled-components'
import cloneDeep from 'lodash/cloneDeep'
import { Grid, _ } from 'gridjs-react'
import 'gridjs/dist/theme/mermaid.css'
import { OnClickViewMetadata, ViewPage } from '../gen/api/api'

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

const Clickable = styled.div`
  cursor: pointer;
`

interface Props {
  currentView: ViewPage | undefined
  isPreview: boolean
}

export const TableView = ({ currentView, isPreview }: Props) => {
  let columnHeaders: string[] = []
  let clickable: (OnClickViewMetadata | undefined)[] = []

  if (currentView?.column_metadata_list) {
    columnHeaders = currentView.column_metadata_list.map(
      (meta) => meta.title || ''
    )
  }

  const data: any[][] | undefined = cloneDeep(currentView?.value_list_list)

  currentView?.view_metadata?.table_view?.column_view_list?.forEach((col) => {
    clickable.push(col.on_click_view)
  })

  const handleClick = (e) => {
    console.log(e.target.innerText)
  }

  if (data) {
    for (let i = 0; i < data[0].length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (clickable[i]) {
          data[j][i] = _(
            <Clickable onClick={(e) => handleClick(e)}>{data[j][i]}</Clickable>
          )
        }
      }
    }
  }

  return (
    <div>
      <GridContainer>
        <Grid
          data={data}
          columns={columnHeaders}
          pagination={{ enabled: true, limit: 30 }}
        />
      </GridContainer>
    </div>
  )
}
