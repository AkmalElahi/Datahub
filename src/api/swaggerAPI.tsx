import {
  DefaultApi,
  TableConstructor,
  ProductMetadataList,
  SessionInfo,
  UserCredentials,
} from 'typescript-axios'

const apiService = new DefaultApi()

export interface User {
  user: SessionInfo
}

export interface Table {
  table: TableConstructor
}

export interface ProductList {
  product_metadata_list: ProductMetadataList
}

export async function signIn(user: UserCredentials) {
  try {
    const userResponse = await apiService.signInPost(user)
    return {
      user: userResponse.data,
    }
  } catch (err) {
    throw err
  }
}

export async function getTable() {
  try {
    const tableResponse = await apiService.getTableConstructorExampleGet()
    return {
      table: tableResponse.data,
    }
  } catch (err) {
    throw err
  }
}

export async function getProductList(sessionId: string, options: any = {}) {
  try {
    console.log(sessionId)
    const listResponse = await apiService.getProductsGet(sessionId, options)

    return {
      product_metadata_list: listResponse.data,
    }
  } catch (err) {
    throw err
  }
}
