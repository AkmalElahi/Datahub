import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  FileParams,
  ProductConstructor,
  ProductFullMetadata,
  ColumnMetadata,
  TableMetadata,
  ProductMetadata,
} from '../../gen/api/api'
import {
  Product,
  getProductConstructorAPI,
  createProductAPI,
  createTableAPI,
  uploadFileAPI,
  publishProductAPI,
  upsertProductMetadataAPI
} from '../../api/swaggerAPI'
import {
  createTableStart,
  createTableSuccess,
  createTableFailure,
} from './tableSlice'
import { setSource } from './tabDisplaySlice'
import { AppThunk } from '../../app/store'

interface ProductState {
  product: ProductConstructor
  isLoading: boolean
  error: string | null
  image_public_link: string | null | undefined
  isUploading:boolean
}

interface NewTable {
  column_metadata_list: ColumnMetadata[] | undefined
  table_metadata: TableMetadata | undefined
}

const productInitialState = {
  product: {},
  isLoading: false,
  error: null,
  image_public_link: null,
  isUploading:false
  
} as ProductState

function startLoading(state: ProductState) {
  state.isLoading = true
  state.image_public_link = null
}

function startUploading(state: ProductState) {
  state.isUploading = true
  state.image_public_link = null
}

function uploadingFailed(state: ProductState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

function loadingFailed(state: ProductState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const product = createSlice({
  name: 'product',
  initialState: productInitialState,
  reducers: {
    getProductStart: startLoading,
    createProductStart: startLoading,
    uploadFileStart: startUploading,
    publishUnpublishStart: startLoading,
    getProductSuccess(state, { payload }: PayloadAction<Product>) {
      const { product } = payload
      state.isLoading = false
      state.error = null
      state.product = product
    },
    createProductSuccess(state, { payload }: PayloadAction<Product>) {
      const { product } = payload
      state.isLoading = false
      state.error = null
      state.product = product
    },
    uploadFileSuccess(state, { payload }: PayloadAction<FileParams>) {
      state.isLoading = false
      state.error = null
      state.image_public_link = payload.public_link
      state.isUploading=false
    },
    updateProductMetadata(
      state,
      { payload }: PayloadAction<ProductFullMetadata>
    ) {
      state.product.product_full_metadata = payload
    },
    publishUnpublishSuccess(
      state,
      { payload }: PayloadAction<ProductMetadata>
    ) {
      state.isLoading = false
      state.error = null
      if (state.product.product_full_metadata)
        state.product.product_full_metadata.product_metadata = payload
    },
    upsertProductSuccess(state, { payload }: PayloadAction<ProductMetadata>) {
      state.isLoading = false
      state.error = null
      if (state.product.product_full_metadata)
        state.product.product_full_metadata.product_metadata = payload
    },
    getProductFailure: loadingFailed,
    createProductFailure: loadingFailed,
    uploadFileFailure: uploadingFailed,
    publishUnpublishFailure: loadingFailed,
  },
})

export const {
  getProductStart,
  createProductStart,
  uploadFileStart,
  publishUnpublishStart,
  getProductSuccess,
  createProductSuccess,
  uploadFileSuccess,
  publishUnpublishSuccess,
  getProductFailure,
  createProductFailure,
  uploadFileFailure,
  publishUnpublishFailure,
  updateProductMetadata,
  upsertProductSuccess
} = product.actions

export default product.reducer

export const uploadThenAddThunk = (
  productName: string,
  tableName: string,
  uploadType: 'data' | 'image',
  dataType: 'product' | 'table',
  fileType: 'link' | 'upload' | 'airtable',
  addViews: string,
  airtableName?: string,
  baseId?: string,
  apiKey?: string,
  publicLink?: string,
  file?: FormData
) => async (dispatch, getState) => {
  let fileParams
  try {
    if (fileType !== 'airtable') {
      dispatch(uploadFileStart())
      fileParams = await uploadFileAPI(uploadType, publicLink, file)
      dispatch(uploadFileSuccess(fileParams))
    }
    const dataSource = {
      ...(fileType !== 'airtable' && {
        csv_data_source: {
          filename: fileParams?.filename,
          file_link: fileParams?.public_link,
        },
      }),
      ...(fileType === 'airtable' && {
        airtable_data_source: {
          base_id: baseId,
          table_name: airtableName,
          api_key: apiKey,
        },
      }),
    }

    if (dataType === 'product') {
      dispatch(createProductStart())
      const sessionId = localStorage.getItem('user') || ''
      const product = await createProductAPI(
        sessionId,
        productName,
        tableName,
        addViews,
        fileParams?.filename,
        fileParams?.public_link,
        dataSource
      )
      dispatch(createProductSuccess(product))
    } else if (dataType === 'table') {
      dispatch(createTableStart())
      const sessionId = localStorage.getItem('user') || ''
      const table = await createTableAPI(
        sessionId,
        productName,
        tableName,
        addViews,
        fileParams?.filename,
        fileParams?.public_link,
        dataSource
      )
      dispatch(createTableSuccess(table))
      if (table.product_full_metadata)
        dispatch(updateProductMetadata(table.product_full_metadata))
      if (dataType === 'table')
        dispatch(
          setSource(
            getState().product.product.product_full_metadata
              .table_full_metadata_list.length - 1,
            tableName
          )
        )
    }
  } catch (err) {
    dispatch(createProductFailure(err.toString()))
  }
}

export const fetchProduct = (productName: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(getProductStart())
    const sessionId = localStorage.getItem('user') || ''
    const product = await getProductConstructorAPI(sessionId, productName)
    dispatch(getProductSuccess(product))
  } catch (err) {
    dispatch(getProductFailure(err.toString()))
  }
}

export const publishUnpublish = (
  productName: string,
  published: boolean
): AppThunk => async (dispatch) => {
  try {
    dispatch(publishUnpublishStart())
    const sessionId = localStorage.getItem('user') || ''
    const product = await publishProductAPI(
      sessionId,
      productName,
      published.toString()
    )
    dispatch(publishUnpublishSuccess(product))
  } catch (err) {
    dispatch(publishUnpublishFailure(err.toString()))
  }
}

export const postProductMetadata = (
  productMetadata: ProductMetadata
): AppThunk => async (dispatch) => {
  try {
    dispatch(createProductStart())
    const sessionId = localStorage.getItem('user') || ''
    const response = await upsertProductMetadataAPI(
      sessionId,
      productMetadata
    )
    dispatch(upsertProductSuccess(response))
  } catch (err) {
    dispatch(createProductFailure(err.toString()))
  }
}

export const uploadHeaderImage = (
  uploadType: 'image',
  publicLink?: string,
  file?: FormData,
): AppThunk => async (dispatch) => {
  let fileParams
  try {
    dispatch(uploadFileStart())
    fileParams = await uploadFileAPI(uploadType, publicLink, file)
    dispatch(uploadFileSuccess(fileParams))
  } catch (err) {
    dispatch(uploadFileFailure(err.toString()))
  }
}