import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Table, TableResult, getTable } from '../../api/swaggerAPI'

interface TableState {
  isLoading: boolean
  error: string | null
}

const tableInitialState = {
  isLoading: false,
  error: null
} as TableState

function startLoading(state: TableState) {
  state.isLoading = true
}

function loadingFailed(state: TableState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const table = createSlice({
  name: 'table',
  initialState: tableInitialState,
  reducers: {
    getTableStart: startLoading,
    getTableSuccess(state, { payload }: PayloadAction<TableResult>) {
      const { table } = payload
      state.isLoading = false
      state.error = null
    },
    getStatesFailure: loadingFailed
  }
})

export default table.reducer