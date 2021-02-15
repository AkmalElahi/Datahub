import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ViewConstructor, ViewMetadata } from '../../gen/api/api'
import { View, getViewAPI, upsertViewMetadataAPI } from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'

interface ViewState {
  viewsByName: Record<string, ViewConstructor>
  draftMetadata: DraftMetadata
  isLoading: boolean
  error: string | null
}

const viewsInitialState: ViewState = {
  viewsByName: {},
  draftMetadata: { metadata: {}, edited: false },
  isLoading: false,
  error: null,
}

export interface DraftMetadata {
  metadata: ViewMetadata
  edited: boolean
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
        state.draftMetadata = { metadata: view.view_metadata, edited: false }
    },
    upsertViewMetadataSuccess(
      state,
      { payload }: PayloadAction<ViewConstructor>
    ) {
      state.isLoading = false
      state.error = null
      state.viewsByName[payload.view_metadata?.name || 'none'] = payload
    },
    draftMetadata(state, { payload }: PayloadAction<DraftMetadata>) {
      console.log('payload: ', payload)
      state.draftMetadata = payload
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
      draftMetadata({ metadata: metadata.view_metadata || {}, edited: false })
    )
    dispatch(upsertViewMetadataSuccess(metadata))
  } catch (err) {
    dispatch(upsertViewMetadataFailure(err.toString()))
  }
}
