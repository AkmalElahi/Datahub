import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store'

import { resetDraftEntities } from './tableSlice'
import { draftMetadata } from './viewSlice'

export interface currentTab {
  tab: string
}

type currentDisplayState = {
  source: number | string
} & currentTab

const initialState: currentDisplayState = {
  tab: 'publish',
  source: 0,
}

const tabDisplaySlice = createSlice({
  name: 'tabDisplay',
  initialState: initialState,
  reducers: {
    setCurrentTab(state, action: PayloadAction<currentTab>) {
      const { tab } = action.payload
      state.tab = tab
    },
    setCurrentSource(state, action: PayloadAction<number | string>) {
      state.source = action.payload
    },
  },
})

export const { setCurrentTab, setCurrentSource } = tabDisplaySlice.actions

export default tabDisplaySlice.reducer

export const setSource = (
  source: number | string,
  sourceName?: string
): AppThunk => async (dispatch, getState) => {
  dispatch(setCurrentSource(source))

  // reset draft for data or view tab, but only after initial load
  if (sourceName) {
    if (getState().tabDisplay.tab === 'data') {
      const table = getState().tables?.tablesByName?.[sourceName]
      if (table) dispatch(resetDraftEntities(sourceName))
    } else if (getState().tabDisplay.tab === 'views') {
      const view = getState().views?.viewsByName?.[sourceName]
      if (view) dispatch(draftMetadata(sourceName))
    }
  }
}
