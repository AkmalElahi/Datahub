import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ProductConstructor, ProductFullMetadata } from 'typescript-axios'
import { Product, getProduct } from '../../api/swaggerAPI'
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
    getProductSuccess(state, { payload }: PayloadAction<Product>) {
      const { product } = payload
      state.isLoading = false
      state.error = null
      state.product = product
    },
    updateProductMetadata(
      state,
      { payload }: PayloadAction<ProductFullMetadata>
    ) {
      state.product.product_full_metadata = payload
    },
    getProductFailure: loadingFailed,
  },
})

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  updateProductMetadata,
} = product.actions

export default product.reducer

export const fetchProduct = (productName: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(getProductStart())
    const sessionId = localStorage.getItem('user') || ''
    const product = await getProduct(sessionId, productName)
    dispatch(getProductSuccess(product))
  } catch (err) {
    dispatch(getProductFailure(err.toString()))
  }
}
