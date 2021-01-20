import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ProductMetadataList } from 'typescript-axios'
import { ProductDataListResult, fetchProducts } from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'

interface DataProductListState {
  list: ProductMetadataList
  isLoading: boolean
  error: string | null
}

const tableInitialState = {
  list: {},
  isLoading: false,
  error: null
} as DataProductListState

function startLoading(state: DataProductListState) {
  state.isLoading = true
}

function loadingFailed(state: DataProductListState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const productList = createSlice({
  name: 'productList',
  initialState: tableInitialState,
  reducers: {
    getListStart: startLoading,
    getListSuccess(state, { payload }: PayloadAction<ProductDataListResult>) {
      const { table } = payload
      state.isLoading = false
      state.error = null
      state.product_metadata_list = table
    },
    getListFailure: loadingFailed
  }
})

export const {
  getListStart,
  getListSuccess,
  getListFailure
} = list.actions

export default list.reducer

export const fetchProducts = (): AppThunk => async dispatch => {
  try {
    dispatch(getListStart())
    const table = await fetchProducts()
    dispatch(getListSuccess(table))
  } catch (err) {
    dispatch(getListFailure(err.toString()))
  }
}