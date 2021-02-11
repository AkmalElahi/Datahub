import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DisplayParams, ViewParams, ViewPage } from '../../gen/api/api'
import { getProductAPI, getProductViewAPI } from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'
import { setCurrentTab } from '../product/tabDisplaySlice'

interface ProductHomeState {
  productViewsByName: Record<string, ViewPage>
  isLoading: boolean
  error: string | null
}

const productHomeInitialState = {
  productViewsByName: {},
  isLoading: false,
  error: null,
} as ProductHomeState

function startLoading(state: ProductHomeState) {
  state.isLoading = true
}

function loadingFailed(state: ProductHomeState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const productView = createSlice({
  name: 'productView',
  initialState: productHomeInitialState,
  reducers: {
    getProductHomeStart: startLoading,
    getProductViewStart: startLoading,
    getProductHomeSuccess(state, { payload }: PayloadAction<ViewPage>) {
      state.isLoading = false
      state.error = null
      state.productViewsByName[payload.view_metadata?.name || 'none'] = payload
    },
    getProductViewSuccess(state, { payload }: PayloadAction<ViewPage>) {
      state.isLoading = false
      state.error = null
      state.productViewsByName[payload.view_metadata?.name || 'none'] = payload
    },
    getProductHomeFailure: loadingFailed,
    getProductViewFailure: loadingFailed,
  },
})

export const {
  getProductHomeStart,
  getProductHomeSuccess,
  getProductHomeFailure,
  getProductViewStart,
  getProductViewSuccess,
  getProductViewFailure,
} = productView.actions

export default productView.reducer

export const fetchProductHome = (
  productName: string,
  displayParams: DisplayParams,
  options: any = {}
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(getProductHomeStart())
    const sessionId = localStorage.getItem('user') || ''
    const productView = await getProductAPI(
      sessionId,
      productName,
      displayParams,
      options
    )
    dispatch(setCurrentTab({ tab: productView.view_metadata?.name || '' }))
    dispatch(getProductHomeSuccess(productView))
  } catch (err) {
    dispatch(getProductHomeFailure(err.toString()))
  }
}

export const fetchProductView = (
  productName: string,
  viewName: string,
  columnName?: string,
  value?: string,
  viewParams?: ViewParams,
  options: any = {}
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(getProductViewStart())
    const sessionId = localStorage.getItem('user') || ''
    const productView = await getProductViewAPI(
      productName,
      viewName,
      sessionId,
      columnName,
      value,
      viewParams,
      options
    )
    dispatch(setCurrentTab({ tab: productView.view_metadata?.name || '' }))
    dispatch(getProductViewSuccess(productView))
  } catch (err) {
    dispatch(getProductViewFailure(err.toString()))
  }
}
