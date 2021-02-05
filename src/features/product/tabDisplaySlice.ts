import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface currentTab {
  tab: string
}

type currentDisplayState = {
  source: number
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
    setCurrentSource(state, action: PayloadAction<number>) {
      state.source = action.payload
    },
  },
})

export const { setCurrentTab, setCurrentSource } = tabDisplaySlice.actions

export default tabDisplaySlice.reducer
