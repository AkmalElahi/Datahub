import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  FileParams,
  ProductConstructor,
  ProductFullMetadata,
  ColumnMetadata,
  TableMetadata,
} from '../../gen/api/api'
import {
  Product,
  getProductConstructorAPI,
  createProductAPI,
  createTableAPI,
  uploadFileAPI,
} from '../../api/swaggerAPI'
import {
  createTableStart,
  createTableSuccess,
  createTableFailure,
} from './tableSlice'
import { setCurrentSource } from './tabDisplaySlice'
import { AppThunk } from '../../app/store'

interface ProductState {
  product: ProductConstructor
  isLoading: boolean
  error: string | null
}

interface NewTable {
  column_metadata_list: ColumnMetadata[] | undefined
  table_metadata: TableMetadata | undefined
}

const productInitialState = {
  product: {},
  isLoading: false,
  error: null,
} as ProductState

function startLoading(state: ProductState) {
  state.isLoading = true
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
    uploadFileStart: startLoading,
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
    },
    updateProductMetadata(
      state,
      { payload }: PayloadAction<ProductFullMetadata>
    ) {
      state.product.product_full_metadata = payload
    },
    getProductFailure: loadingFailed,
    createProductFailure: loadingFailed,
    uploadFileFailure: loadingFailed,
  },
})

export const {
  getProductStart,
  createProductStart,
  uploadFileStart,
  getProductSuccess,
  createProductSuccess,
  uploadFileSuccess,
  getProductFailure,
  createProductFailure,
  uploadFileFailure,
  updateProductMetadata,
} = product.actions

export default product.reducer

export const uploadThenAddThunk = (
  productName: string,
  tableName: string,
  uploadType: 'data' | 'image',
  dataType: 'product' | 'table',
  fileType: 'link' | 'upload',
  addViews: string,
  publicLink?: string,
  file?: FormData
) => async (dispatch, getState) => {
  let fileParams
  try {
    dispatch(uploadFileStart())
    fileParams = await uploadFileAPI(uploadType, publicLink, file)
    dispatch(uploadFileSuccess(fileParams))

    if (dataType === 'product') {
      dispatch(createProductStart())
      const sessionId = localStorage.getItem('user') || ''
      const dataSource = {
        csv_data_source: {
          filename: fileParams.filename,
          file_link: fileParams.public_link,
        },
      }
      const product = await createProductAPI(
        sessionId,
        productName,
        tableName,
        addViews,
        fileParams.filename,
        fileParams.public_link,
        dataSource
      )
      dispatch(createProductSuccess(product))
    } else if (dataType === 'table') {
      dispatch(createTableStart())
      const sessionId = localStorage.getItem('user') || ''
      const dataSource = {
        csv_data_source: {
          filename: fileParams.filename,
          file_link: fileParams.public_link,
        },
      }
      const table = await createTableAPI(
        sessionId,
        productName,
        tableName,
        addViews,
        fileParams.filename,
        fileParams.public_link,
        dataSource
      )
      dispatch(createTableSuccess(table))
      if (table.product_full_metadata)
        dispatch(updateProductMetadata(table.product_full_metadata))
      if (dataType === 'table')
        dispatch(
          setCurrentSource(
            getState().product.product.product_full_metadata
              .table_full_metadata_list.length - 1
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
