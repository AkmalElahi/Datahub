import { combineReducers } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import tableReducer from '../features/product/tableSlice'
import productReducer from '../features/product/productSlice'
import tabDisplayReducer from '../features/product/tabDisplaySlice'
import productListReducer from '../features/productList/productListSlice'
import productViewReducer from '../features/productView/productViewSlice'
import viewReducer from '../features/product/viewSlice'

const rootReducer = combineReducers({
  user: userReducer,
  tables: tableReducer,
  product: productReducer,
  productView: productViewReducer,
  tabDisplay: tabDisplayReducer,
  productMetadataList: productListReducer,
  views: viewReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
