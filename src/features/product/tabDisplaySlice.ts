import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface currentTab {
  tab: 'data' | 'views' | 'publish'
}

const tabInitialState = {
  tab: 'data',
}

const tabDisplaySlice = createSlice({
  name: 'tabDisplay',
  initialState: tabInitialState,
  reducers: {
    setCurrentTab(state, action: PayloadAction<currentTab>) {
      const { tab } = action.payload
      state.tab = tab
    },
  },
})

export const { setCurrentTab } = tabDisplaySlice.actions

export default tabDisplaySlice.reducer
