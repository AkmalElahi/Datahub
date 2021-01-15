import axios from 'axios'

export interface ViewFilter {
  description: string
}

export interface TableMetadata {
  name: string
  product_name: string
  title: string
  description: string
  popularity: number
}

export interface ColumnMetadata {
  name: string
  table_name: string
  product_name: string
  title: string
  description: string
  data_type: number
  is_primary_key: boolean
  entity_name: string
  column_num: number
  generated: boolean
  entity_name_candidate_list: string[]
  view_filter: ViewFilter

}

export interface Table {
  description: string
  table_metadata: TableMetadata
  column_metadata_list: ColumnMetadata[]
  value_list_list: string[][]
}

export interface TableResult {
  table: Table
}

export async function getTable(): Promise<TableResult> {
  const url = `${process.env.REACT_APP_API_ROOT}/get_table_constructor_example`
  try {
    const tableResponse = await axios.get<Table>(url)

    return {
      table: tableResponse.data
    }
  } catch (err) {
    throw err
  }
}