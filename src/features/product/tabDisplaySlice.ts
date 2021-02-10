import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store'

import { resetDraftEntities } from './tableSlice'

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
  initialLoad?: boolean,
  sourceName?: string
): AppThunk => async (dispatch) => {
  dispatch(setCurrentSource(source))
  if (!initialLoad && typeof source === 'number')
    dispatch(resetDraftEntities(sourceName))
}
