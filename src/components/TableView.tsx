import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import { Grid, _ } from 'gridjs-react'
import 'gridjs/dist/theme/mermaid.css'
import { OnClickViewMetadata, ViewPage } from '../gen/api/api'
import { fetchProductView } from '../features/productView/productViewSlice'

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
  color: #4d9ef6;
`

interface Props {
  currentView: ViewPage | undefined
  isPreview: boolean
}

export const TableView = ({ currentView, isPreview }: Props) => {
  const dispatch = useDispatch()
  let columnHeaders: string[] = []
  let clickable: (OnClickViewMetadata | undefined)[] = []
  let data: any[][] | undefined = []

  if (currentView?.column_metadata_list) {
    columnHeaders =
      currentView.view_metadata?.table_view?.column_view_list?.map(
        (meta) => meta.title || ''
      ) || []
  }
  if (!isPreview) {
    data = cloneDeep(currentView?.value_list_list)
    currentView?.view_metadata?.table_view?.column_view_list?.forEach((col) => {
      clickable.push(col.on_click_view)
    })
  } else data = currentView?.value_list_list

  const handleClick = (e, onClickView) => {
    dispatch(
      fetchProductView(
        onClickView.product_name,
        onClickView.view_name,
        onClickView.column_name,
        e.target.innerText
      )
    )
  }
  if (data && !isEmpty(data) && !isPreview) {
    for (let i = 0; i < data[0].length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (clickable[i]) {
          data[j][i] = _(
            <Clickable onClick={(e) => handleClick(e, clickable[i])}>
              {data[j][i]}
            </Clickable>
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
