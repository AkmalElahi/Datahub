import {
  DefaultApi,
  TableConstructor,
  TableFullMetadata,
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
    const response = await apiService.signInPost(user)
    return {
      user: response.data,
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
    const response = await apiService.getTableConstructorGet(
      sessionId,
      productName,
      tableName
    )
    return {
      table: response.data,
    }
  } catch (err) {
    throw err
  }
}

export async function upsertTableMetadata(
  sessionId: string,
  metadata: TableFullMetadata
) {
  try {
    const response = await apiService.upsertTableMetadataPost(
      sessionId,
      metadata
    )
    return response.data
  } catch (err) {
    throw err
  }
}

export async function getProduct(sessionId: string, productName: string) {
  try {
    const response = await apiService.getProductConstructorGet(
      sessionId,
      productName
    )
    return {
      product: response.data,
    }
  } catch (err) {
    throw err
  }
}

export async function getProductList(sessionId: string, options: any = {}) {
  try {
    const response = await apiService.getProductsGet(sessionId, options)

    return {
      productMetadataList: response.data,
    }
  } catch (err) {
    throw err
  }
}
