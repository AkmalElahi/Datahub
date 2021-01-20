import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ProductMetadataList } from 'typescript-axios'
import { ProductListResult, getProductList } from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'

interface ProductListState {
  product_metadata_list: ProductMetadataList
  isLoading: boolean
  error: string | null
}

const productListInitialState = {
  product_metadata_list: {},
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
    getListSuccess(state, { payload }: PayloadAction<ProductListResult>) {
      const { product_metadata_list } = payload
      state.isLoading = false
      state.error = null
      state.product_metadata_list = product_metadata_list
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

export const fetchProducts = (
  sessionId: string,
  options?: any
): AppThunk => async (dispatch) => {
  try {
    dispatch(getListStart())
    const list = await getProductList(sessionId)
    dispatch(getListSuccess(list))
  } catch (err) {
    dispatch(getListFailure(err.toString()))
  }
}
