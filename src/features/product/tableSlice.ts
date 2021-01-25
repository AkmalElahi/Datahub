import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TableConstructor, TableFullMetadata } from 'typescript-axios'
import { Table, getTable, upsertTableMetadata } from '../../api/swaggerAPI'
import { AppThunk } from '../../app/store'

interface TablesState {
  tablesByName: Record<string, TableConstructor>
  isLoading: boolean
  error: string | null
}

const tablesInitialState: TablesState = {
  tablesByName: {},
  isLoading: false,
  error: null,
}

function startLoading(state: TablesState) {
  state.isLoading = true
}

function loadingFailed(state: TablesState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const tables = createSlice({
  name: 'tables',
  initialState: tablesInitialState,
  reducers: {
    getTableStart: startLoading,
    upsertTableMetadataStart: startLoading,
    getTableSuccess(state, { payload }: PayloadAction<Table>) {
      const { table } = payload
      state.isLoading = false
      state.error = null
      state.tablesByName[table.table_metadata?.name || 'none'] = table
    },
    upsertTableMetadataSuccess(
      state,
      { payload }: PayloadAction<TableFullMetadata>
    ) {
      const { table_metadata, column_metadata_list } = payload
      state.isLoading = false
      state.error = null
    },
    getTableFailure: loadingFailed,
    upsertTableMetadataFailure: loadingFailed,
  },
})

export const {
  getTableStart,
  upsertTableMetadataStart,
  getTableSuccess,
  upsertTableMetadataSuccess,
  getTableFailure,
  upsertTableMetadataFailure,
} = tables.actions

export default tables.reducer

export const fetchTable = (
  productName: string,
  tableName: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(getTableStart())
    const sessionId = localStorage.getItem('user') || ''
    const table = await getTable(sessionId, productName, tableName)
    dispatch(getTableSuccess(table))
  } catch (err) {
    dispatch(getTableFailure(err.toString()))
  }
}

export const postTableMetadata = (
  fullMetadata: TableFullMetadata
): AppThunk => async (dispatch) => {
  try {
    dispatch(upsertTableMetadataStart())
    const sessionId = localStorage.getItem('user') || ''
    const metadata = await upsertTableMetadata(sessionId, fullMetadata)
    dispatch(upsertTableMetadataSuccess(metadata))
  } catch (err) {
    dispatch(upsertTableMetadataFailure(err.toString()))
  }
}
