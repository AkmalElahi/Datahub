import {
  DataSource,
  DefaultApi,
  TableConstructor,
  TableFullMetadata,
  EntityFullMetadata,
  ProductConstructor,
  ProductMetadataList,
  SessionInfo,
  UserCredentials,
  ViewConstructor,
  ViewMetadata,
} from 'typescript-axios'

const apiService = new DefaultApi()

export interface User {
  user: SessionInfo
}

export interface Table {
  table: TableConstructor
}

export interface View {
  view: ViewConstructor
}

export interface Product {
  product: ProductConstructor
}

export interface ProductList {
  productMetadataList: ProductMetadataList
}

export async function signInAPI(user: UserCredentials) {
  try {
    const response = await apiService.signInPost(user)
    return {
      user: response.data,
    }
  } catch (err) {
    throw err
  }
}

export async function getTableAPI(
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

export async function getViewAPI(
  sessionId: string,
  productName: string,
  viewName: string
) {
  try {
    const response = await apiService.getViewConstructorGet(
      sessionId,
      productName,
      viewName
    )
    return {
      view: response.data,
    }
  } catch (err) {
    throw err
  }
}

export async function upsertTableMetadataAPI(
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

export async function upsertEntityMetadataAPI(metadata: EntityFullMetadata) {
  try {
    const response = await apiService.upsertEntityMetadataPost(metadata)
    return response.data
  } catch (err) {
    throw err
  }
}

export async function upsertViewMetadataAPI(
  sessionId: string,
  metadata: ViewMetadata
) {
  try {
    const response = await apiService.upsertViewMetadataPost(
      sessionId,
      metadata
    )
    return response.data
  } catch (err) {
    throw err
  }
}

export async function getProductAPI(sessionId: string, productName: string) {
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

export async function createProductAPI(
  sessionId: string,
  productName: string,
  tableName: string,
  addDefaultViews: string,
  filename?: string,
  fileLink?: string,
  dataSource?: DataSource,
  options?: any
) {
  try {
    const response = await apiService.createProductUploadFilePost(
      sessionId,
      productName,
      tableName,
      addDefaultViews,
      filename,
      fileLink,
      dataSource,
      options
    )
    return {
      product: response.data,
    }
  } catch (err) {
    throw err
  }
}

export async function getProductListAPI(sessionId: string, options: any = {}) {
  try {
    const response = await apiService.getProductsGet(sessionId, options)

    return {
      productMetadataList: response.data,
    }
  } catch (err) {
    throw err
  }
}

export async function uploadFileAPI(
  category: 'data' | 'image',
  publicLink?: string,
  file?: FormData,
  options: any = {}
) {
  try {
    const response = await apiService.uploadFilePost(
      category,
      publicLink,
      file,
      options
    )

    return response.data
  } catch (err) {
    throw err
  }
}
