import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  FileParams,
  ProductConstructor,
  ProductFullMetadata,
} from 'typescript-axios'
import {
  Product,
  getProductAPI,
  createProductAPI,
  uploadFileAPI,
} from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'

interface ProductState {
  product: ProductConstructor
  isLoading: boolean
  error: string | null
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

export const uploadThenCreateProductThunk = (
  productName: string,
  tableName: string,
  uploadType: 'link' | 'upload',
  addViews: string,
  publicLink?: string,
  file?: FormData
) => async (dispatch) => {
  try {
    dispatch(uploadFileStart())
    const fileParams = await uploadFileAPI('data', publicLink, file)
    console.log(fileParams)
    dispatch(uploadFileSuccess(fileParams))

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
    console.log(product)
  } catch (err) {
    dispatch(getProductFailure(err.toString()))
  }
}

export const fetchProduct = (productName: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(getProductStart())
    const sessionId = localStorage.getItem('user') || ''
    const product = await getProductAPI(sessionId, productName)
    dispatch(getProductSuccess(product))
  } catch (err) {
    dispatch(getProductFailure(err.toString()))
  }
}

export const createProduct = (
  productName: string,
  tableName: string,
  uploadType: 'link' | 'upload',
  addViews: string,
  publicLink?: string,
  file?: FormData
): AppThunk => async (dispatch) => {
  uploadThenCreateProductThunk(
    productName,
    tableName,
    uploadType,
    addViews,
    publicLink,
    file
  )
}
