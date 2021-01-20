import {
  DefaultApi,
  TableConstructor,
  ProductMetadataList,
} from 'typescript-axios'

const apiService = new DefaultApi()

export interface TableResult {
  table: TableConstructor
}

export interface ProductListResult {
  product_metadata_list: ProductMetadataList
}

export async function getTable(): Promise<TableResult> {
  try {
    const tableResponse = await apiService.getTableConstructorExampleGet()

    return {
      table: tableResponse.data,
    }
  } catch (err) {
    throw err
  }
}

export async function getProductList(
  sessionId: string,
  options?: any
): Promise<ProductListResult> {
  try {
    const listResponse = await apiService.getProductsGet(sessionId, options)

    return {
      product_metadata_list: listResponse.data,
    }
  } catch (err) {
    throw err
  }
}
