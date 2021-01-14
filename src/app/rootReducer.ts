import { combineReducers } from '@reduxjs/toolkit';

import tableReducer from '../features/tableList/tableSlice'

const rootReducer = combineReducers({
  table: tableReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer