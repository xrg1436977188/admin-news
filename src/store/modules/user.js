import { createSlice } from '@reduxjs/toolkit'
import { $login } from '@/api/login'
import { setToken as _setToken, getToken } from '@/utils'
import { message } from 'antd'
const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',// 用户token
        // 用户信息
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :''
    },
    // 同步方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        }
    }
})
const { setToken, setUserInfo } = userStore.actions
const userReducer = userStore.reducer

// 异步-登录
const login = (loginData) => {
    return async (dispatch) => {
        // 发送异步请求
        const res = await $login(loginData)
        // 提交同步action 进行token,用户信息存储
        if(res.status===0){
            dispatch(setToken(res.token))
            dispatch(setUserInfo(res.data))
            message.success('登录成功')
        }else{
            message.error('账号或密码错误')
        }

    }
}

export { setToken, login }
export default userReducer


