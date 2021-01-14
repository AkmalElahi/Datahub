import React from 'react'

import { Table } from '../api/swaggerAPI'

interface Props {
  data: Table
}

export const TableView = ({ data }: Props) => {
  const renderedTable = data
  return <div>{data.table_metadata.name}</div>
}
