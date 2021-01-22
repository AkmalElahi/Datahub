import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ProductMetadataList } from 'typescript-axios'
import { ProductList, getProductList } from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'

interface ProductListState {
  productMetadataList: ProductMetadataList
  isLoading: boolean
  error: string | null
}

const productListInitialState = {
  productMetadataList: {},
  isLoading: false,
  error: null,
} as ProductListState

function startLoading(state: ProductListState) {
  state.isLoading = true
}

function loadingFailed(state: ProductListState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const productList = createSlice({
  name: 'productList',
  initialState: productListInitialState,
  reducers: {
    getListStart: startLoading,
    getListSuccess(state, { payload }: PayloadAction<ProductList>) {
      const { productMetadataList } = payload
      state.isLoading = false
      state.error = null
      state.productMetadataList = productMetadataList
    },
    getListFailure: loadingFailed,
  },
})

export const {
  getListStart,
  getListSuccess,
  getListFailure,
} = productList.actions

export default productList.reducer

export const fetchProducts = (options: any = {}): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(getListStart())
    const sessionId = localStorage.getItem('user') || ''
    const list = await getProductList(sessionId, options)
    dispatch(getListSuccess(list))
  } catch (err) {
    dispatch(getListFailure(err.toString()))
  }
}
