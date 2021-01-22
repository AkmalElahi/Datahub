import { combineReducers } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import tableReducer from '../features/product/tableSlice'
import productReducer from '../features/product/productSlice'
import tabDisplayReducer from '../features/product/tabDisplaySlice'
import productListReducer from '../features/productList/productListSlice'

const rootReducer = combineReducers({
  user: userReducer,
  table: tableReducer,
  product: productReducer,
  tabDisplay: tabDisplayReducer,
  productMetadataList: productListReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
