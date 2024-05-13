import userReducer from './modules/user'
import menuReducer from './modules/menu'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    user: userReducer, // 用户信息
    menu: menuReducer // 菜单信息
  }
})