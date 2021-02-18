import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ViewConstructor, ViewMetadata } from '../../gen/api/api'
import {
  View,
  getViewAPI,
  upsertViewMetadataAPI,
  addViewAPI
} from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'
import {
  updateProductMetadata,
} from "./productSlice";

interface ViewState {
  viewsByName: Record<string, ViewConstructor>
  draftMetadata: DraftMetadata
  isLoading: boolean
  error: string | null
}

const viewsInitialState: ViewState = {
  viewsByName: {},
  draftMetadata: { metadata: {} },
  isLoading: false,
  error: null,
}

export interface DraftMetadata {
  metadata: ViewMetadata
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
      if (view.view_metadata)
        state.draftMetadata = { metadata: view.view_metadata }
    },
    upsertViewMetadataSuccess(
      state,
      { payload }: PayloadAction<ViewConstructor>
    ) {
      state.isLoading = false
      state.error = null
      state.viewsByName[payload.view_metadata?.name || 'none'] = payload
    },
    draftMetadata(
      state,
      { payload }: PayloadAction<DraftMetadata | string | undefined>
    ) {
      if (payload) {
        if (typeof payload === 'string') {
          state.draftMetadata = {
            metadata: state.viewsByName[payload || 'none']?.view_metadata || {},
          }
        } else {
          state.draftMetadata = payload
        }
      }
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
  draftMetadata,
} = views.actions

export default views.reducer

export const addView = (
    name: string,
    productName: string,
    tableName: string,
    viewType: 'table' | 'card',
): AppThunk => async (dispatch) => {
  try {
    dispatch(getViewStart())
    const sessionId = localStorage.getItem('user') || ''
    let viewMetadata = {} as ViewMetadata
    viewMetadata.name = name
    viewMetadata.product_name = productName
    viewMetadata.table_name = tableName
    viewMetadata.view_type = viewType
    const viewConstructorResponse = await addViewAPI(sessionId, viewMetadata)
    dispatch(getViewSuccess(viewConstructorResponse))
    if (viewConstructorResponse.view.product_full_metadata)
      dispatch(updateProductMetadata(viewConstructorResponse.view.product_full_metadata))
  } catch (err) {
    dispatch(getViewFailure(err.toString()))
  }
}

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
    dispatch(
      draftMetadata({ metadata: metadata.view_metadata || {} })
    )
    dispatch(upsertViewMetadataSuccess(metadata))
  } catch (err) {
    dispatch(upsertViewMetadataFailure(err.toString()))
  }
}
