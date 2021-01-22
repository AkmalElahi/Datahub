import { combineReducers } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import tableReducer from '../features/product/tableSlice'
import tabDisplayReducer from '../features/product/tabDisplaySlice'
import productListReducer from '../features/productList/productListSlice'

const rootReducer = combineReducers({
  user: userReducer,
  table: tableReducer,
  tabDisplay: tabDisplayReducer,
  productMetadataList: productListReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
