import { combineReducers } from '@reduxjs/toolkit';

import tableReducer from '../features/product/tableSlice'

const rootReducer = combineReducers({
  table: tableReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer