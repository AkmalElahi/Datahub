import { DefaultApi, TableConstructor } from 'typescript-axios'

const apiService = new DefaultApi()

export interface TableResult {
  table: TableConstructor
}

export async function getTable(): Promise<TableResult> {
  const url = `${process.env.REACT_APP_API_ROOT}/get_table_constructor_example`
  try {
    const tableResponse = await apiService.getTableConstructorExampleGet()

    return {
      table: tableResponse.data
    }
  } catch (err) {
    throw err
  }
}