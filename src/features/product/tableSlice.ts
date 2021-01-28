import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  TableConstructor,
  TableFullMetadata,
  EntityFullMetadata,
} from 'typescript-axios'
import {
  Table,
  getTable,
  upsertTableMetadata,
  upsertEntityMetadata,
} from '../../api/swaggerAPI'

import { updateProductMetadata } from './productSlice'
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
    upsertEntityMetadataStart: startLoading,
    getTableSuccess(state, { payload }: PayloadAction<Table>) {
      const { table } = payload
      state.isLoading = false
      state.error = null
      state.tablesByName[table.table_metadata?.name || 'none'] = table
    },
    upsertTableMetadataSuccess(
      state,
      { payload }: PayloadAction<TableConstructor>
    ) {
      state.isLoading = false
      state.error = null
      state.tablesByName[payload.table_metadata?.name || 'none'] = {
        ...state.tablesByName[payload.table_metadata?.name || 'none'],
        ...payload,
      }
    },
    upsertEntityMetadataSuccess(
      state,
      { payload }: PayloadAction<EntityFullMetadata>
    ) {
      state.isLoading = false
      state.error = null
    },
    getTableFailure: loadingFailed,
    upsertTableMetadataFailure: loadingFailed,
    upsertEntityMetadataFailure: loadingFailed,
  },
})

const updateProductThunk = (metadata: TableConstructor) => {
  return (dispatch, getState) => {
    if (metadata.product_full_metadata)
      dispatch(updateProductMetadata(metadata.product_full_metadata))
  }
}

const updateColumnThunk = (
  entityMetadata: EntityFullMetadata | null,
  tableName: string,
  columnIndex: number
) => {
  return (dispatch, getState) => {
    const { table_full_metadata } = getState().tables.tablesByName[tableName]
    const entityName =
      entityMetadata !== null ? entityMetadata.entity_metadata?.name : null
    let newMetadata
    let candidateList =
      table_full_metadata.column_metadata_list[columnIndex]
        .entity_name_candidate_list

    if (entityMetadata !== null) {
      candidateList
        ? candidateList.push(entityName)
        : (candidateList = [entityName])
    }

    let combinedColumnData = table_full_metadata.column_metadata_list.map(
      (v, k) => {
        if (k !== columnIndex) {
          return {
            ...v,
            entity_name_candidate_list: candidateList,
          }
        }
        return {
          ...v,
          entity_name: entityName,
          entity_name_candidate_list: candidateList,
        }
      }
    )

    newMetadata = {
      ...table_full_metadata,
      column_metadata_list: [...combinedColumnData],
    }

    dispatch(postTableMetadata(newMetadata))
  }
}

export const {
  getTableStart,
  upsertTableMetadataStart,
  upsertEntityMetadataStart,
  getTableSuccess,
  upsertTableMetadataSuccess,
  upsertEntityMetadataSuccess,
  getTableFailure,
  upsertTableMetadataFailure,
  upsertEntityMetadataFailure,
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
    dispatch(updateProductThunk(metadata))
  } catch (err) {
    dispatch(upsertTableMetadataFailure(err.toString()))
  }
}

export const postEntityMetadata = (
  fullMetadata: EntityFullMetadata | null,
  tableName: string,
  columnIndex: number
): AppThunk => async (dispatch) => {
  if (!fullMetadata) {
    dispatch(updateColumnThunk(null, tableName, columnIndex))
  } else {
    try {
      dispatch(upsertEntityMetadataStart())
      const metadata = await upsertEntityMetadata(fullMetadata)
      dispatch(upsertEntityMetadataSuccess(metadata))
      dispatch(updateColumnThunk(metadata, tableName, columnIndex))
    } catch (err) {
      dispatch(upsertEntityMetadataFailure(err.toString()))
    }
  }
}
