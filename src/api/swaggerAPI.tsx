import {
  DefaultApi,
  TableConstructor,
  ProductConstructor,
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

export interface Product {
  product: ProductConstructor
}

export interface ProductList {
  productMetadataList: ProductMetadataList
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

export async function getTable(
  sessionId: string,
  productName: string,
  tableName: string
) {
  try {
    const tableResponse = await apiService.getTableConstructorGet(
      sessionId,
      productName,
      tableName
    )
    return {
      table: tableResponse.data,
    }
  } catch (err) {
    throw err
  }
}

export async function getProduct(sessionId: string, productName: string) {
  try {
    const productResponse = await apiService.getProductConstructorGet(
      sessionId,
      productName
    )
    return {
      product: productResponse.data,
    }
  } catch (err) {
    throw err
  }
}

export async function getProductList(sessionId: string, options: any = {}) {
  try {
    const listResponse = await apiService.getProductsGet(sessionId, options)

    return {
      productMetadataList: listResponse.data,
    }
  } catch (err) {
    throw err
  }
}
