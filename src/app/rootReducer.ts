import { combineReducers } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import tableReducer from '../features/product/tableSlice'
import productListReducer from '../features/productList/productListSlice'

const rootReducer = combineReducers({
  user: userReducer,
  table: tableReducer,
  product_metadata_list: productListReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
