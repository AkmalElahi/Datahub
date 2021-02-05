import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DisplayParams, ViewPage } from 'typescript-axios'
import { getProductAPI } from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'

interface ProductViewState {
  productView: ViewPage
  isLoading: boolean
  error: string | null
}

const productViewInitialState = {
  productView: {},
  isLoading: false,
  error: null,
} as ProductViewState

function startLoading(state: ProductViewState) {
  state.isLoading = true
}

function loadingFailed(state: ProductViewState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const productView = createSlice({
  name: 'productView',
  initialState: productViewInitialState,
  reducers: {
    getProductViewStart: startLoading,
    getProductViewSuccess(state, { payload }: PayloadAction<ViewPage>) {
      state.isLoading = false
      state.error = null
      state.productView = payload
    },
    getProductViewFailure: loadingFailed,
  },
})

export const {
  getProductViewStart,
  getProductViewSuccess,
  getProductViewFailure,
} = productView.actions

export default productView.reducer

export const fetchProductView = (
  productName: string,
  displayParams: DisplayParams,
  options: any = {}
): AppThunk => async (dispatch) => {
  try {
    dispatch(getProductViewStart())
    const sessionId = localStorage.getItem('user') || ''
    const productView = await getProductAPI(
      sessionId,
      productName,
      displayParams,
      options
    )
    dispatch(getProductViewSuccess(productView))
  } catch (err) {
    dispatch(getProductViewFailure(err.toString()))
  }
}
