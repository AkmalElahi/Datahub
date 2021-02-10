import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  TableConstructor,
  TableFullMetadata,
  EntityFullMetadata,
} from '../../gen/api/api'
import {
  Table,
  getTableAPI,
  upsertTableMetadataAPI,
  upsertEntityMetadataAPI,
} from '../../api/swaggerAPI'

import { updateProductMetadata } from './productSlice'
import { AppThunk } from '../../app/store'

interface TablesState {
  tablesByName: Record<string, TableConstructor>
  draftEntities: DraftEntity[]
  isLoading: boolean
  error: string | null
}

const tablesInitialState: TablesState = {
  tablesByName: {},
  draftEntities: [],
  isLoading: false,
  error: null,
}

export interface DraftEntity {
  entity: EntityFullMetadata | undefined
  columnIndex: number
  edited: boolean
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
    createTableStart: startLoading,
    upsertTableMetadataStart: startLoading,
    upsertEntityMetadataStart: startLoading,
    getTableSuccess(state, { payload }: PayloadAction<Table>) {
      const { table } = payload
      state.isLoading = false
      state.error = null
      state.tablesByName[table.table_metadata?.name || 'none'] = table
    },
    createTableSuccess(state, { payload }: PayloadAction<TableConstructor>) {
      state.isLoading = false
      state.error = null
      state.tablesByName[payload.table_metadata?.name || 'none'] = payload
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
    draftEntityMetadata(state, { payload }: PayloadAction<DraftEntity>) {
      state.draftEntities[payload.columnIndex] = payload
    },
    getTableFailure: loadingFailed,
    createTableFailure: loadingFailed,
    upsertTableMetadataFailure: loadingFailed,
    upsertEntityMetadataFailure: loadingFailed,
    resetDraftEntities(
      state,
      { payload }: PayloadAction<Table | string | undefined>
    ) {
      if (payload) {
        let table
        if (typeof payload === 'string') table = state.tablesByName[payload]
        else table = payload.table
        state.draftEntities = []
        table.column_metadata_list?.forEach((col, i) => {
          let entity: EntityFullMetadata | null = {}
          const foundEntity = table.entity_metadata_candidate_list_list?.[
            i
          ].entity_metadata_list?.find((e) => e.name === col.entity_name)

          if (col.entity_name !== null) {
            entity = {
              entity_metadata: {
                name: foundEntity?.name,
                title: foundEntity?.title,
                description: foundEntity?.description,
              },
            }
          }

          let draft: DraftEntity = {
            entity: entity,
            columnIndex: i,
            edited: false,
          }
          state.draftEntities[i] = draft
        })
      }
    },
  },
})

const postEntityThunk = (
  draftEntities: DraftEntity[],
  tableName: string
): AppThunk => async (dispatch) => {
  for (let entity of draftEntities) {
    if (entity.edited) {
      try {
        dispatch(upsertEntityMetadataStart())
        const metadata = await upsertEntityMetadataAPI(entity.entity)
        dispatch(upsertEntityMetadataSuccess(metadata))
      } catch (err) {
        dispatch(upsertEntityMetadataFailure(err.toString()))
      }
    }
  }
}

const updateProductThunk = (metadata: TableConstructor) => {
  return (dispatch, getState) => {
    if (metadata.product_full_metadata)
      dispatch(updateProductMetadata(metadata.product_full_metadata))
  }
}

export const {
  getTableStart,
  createTableStart,
  upsertTableMetadataStart,
  upsertEntityMetadataStart,
  getTableSuccess,
  createTableSuccess,
  upsertTableMetadataSuccess,
  upsertEntityMetadataSuccess,
  getTableFailure,
  createTableFailure,
  upsertTableMetadataFailure,
  upsertEntityMetadataFailure,
  draftEntityMetadata,
  resetDraftEntities,
} = tables.actions

export default tables.reducer

export const fetchTable = (
  productName: string,
  tableName: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(getTableStart())
    const sessionId = localStorage.getItem('user') || ''
    const table = await getTableAPI(sessionId, productName, tableName)
    dispatch(resetDraftEntities(table))
    dispatch(getTableSuccess(table))
  } catch (err) {
    dispatch(getTableFailure(err.toString()))
  }
}

export const postTableMetadata = (
  fullMetadata: TableFullMetadata,
  draftEntities: DraftEntity[],
  tableName: string
): AppThunk => async (dispatch) => {
  try {
    await dispatch(postEntityThunk(draftEntities, tableName))

    dispatch(upsertTableMetadataStart())
    const sessionId = localStorage.getItem('user') || ''
    const metadata = await upsertTableMetadataAPI(sessionId, fullMetadata)
    dispatch(upsertTableMetadataSuccess(metadata))

    dispatch(updateProductThunk(metadata))
  } catch (err) {
    dispatch(upsertTableMetadataFailure(err.toString()))
  }
}
