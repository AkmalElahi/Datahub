import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ViewConstructor, ViewMetadata } from '../../gen/api/api'
import { View, getViewAPI, upsertViewMetadataAPI } from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'

interface ViewState {
  viewsByName: Record<string, ViewConstructor>
  isLoading: boolean
  error: string | null
}

const viewsInitialState: ViewState = {
  viewsByName: {},
  isLoading: false,
  error: null,
}

function startLoading(state: ViewState) {
  state.isLoading = true
}

function loadingFailed(state: ViewState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const views = createSlice({
  name: 'views',
  initialState: viewsInitialState,
  reducers: {
    getViewStart: startLoading,
    upsertViewMetadataStart: startLoading,
    getViewSuccess(state, { payload }: PayloadAction<View>) {
      const { view } = payload
      state.isLoading = false
      state.error = null
      state.viewsByName[view.view_metadata?.name || 'none'] = view
    },
    upsertViewMetadataSuccess(
      state,
      { payload }: PayloadAction<ViewConstructor>
    ) {
      state.isLoading = false
      state.error = null
    },
    getViewFailure: loadingFailed,
    upsertViewMetadataFailure: loadingFailed,
  },
})

export const {
  getViewStart,
  upsertViewMetadataStart,
  getViewSuccess,
  upsertViewMetadataSuccess,
  getViewFailure,
  upsertViewMetadataFailure,
} = views.actions

export default views.reducer

export const fetchView = (
  productName: string,
  tableName: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(getViewStart())
    const sessionId = localStorage.getItem('user') || ''
    const table = await getViewAPI(sessionId, productName, tableName)
    dispatch(getViewSuccess(table))
  } catch (err) {
    dispatch(getViewFailure(err.toString()))
  }
}

export const postViewMetadata = (
  fullMetadata: ViewMetadata
): AppThunk => async (dispatch) => {
  try {
    dispatch(upsertViewMetadataStart())
    const sessionId = localStorage.getItem('user') || ''
    const metadata = await upsertViewMetadataAPI(sessionId, fullMetadata)
    dispatch(upsertViewMetadataSuccess(metadata))
  } catch (err) {
    dispatch(upsertViewMetadataFailure(err.toString()))
  }
}
