import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Table, TableResult, getTable } from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'

interface TableState {
  table: object
  isLoading: boolean
  error: string | null
}

const tableInitialState = {
  table: {},
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
      state.table = table
    },
    getTableFailure: loadingFailed
  }
})

export const {
  getTableStart,
  getTableSuccess,
  getTableFailure
} = table.actions

export default table.reducer

export const fetchTable = (): AppThunk => async dispatch => {
  try {
    dispatch(getTableStart())
    const table = await getTable()
    dispatch(getTableSuccess(table))
  } catch (err) {
    dispatch(getTableFailure(err.toString()))
  }
}