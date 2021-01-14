import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice'
import tableReducer from '../features/tableList/tableSlice'

const rootReducer = combineReducers({
  table: tableReducer,
  counter: counterReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer