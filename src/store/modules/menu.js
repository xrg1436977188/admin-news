import { createSlice } from '@reduxjs/toolkit'
import { $ByIdentityGetMenu } from '@/api/menu'
import { setMenuList, getMenuList } from '@/utils'
const menuStore = createSlice({
    name: 'menu',
    initialState: {
        menuList: getMenuList() || '',
    },
    reducers: {
        setMenu(state, action) {
            state.menuList = action.payload
            setMenuList(JSON.stringify(action.payload))
        }
    }
})

const { setMenu } = menuStore.actions
const menuReducer = menuStore.reducer

const getMneuList = (id) => {
    return async (dispatch) => {
        const res = await $ByIdentityGetMenu(id)
        if (res.status === 0) {
            dispatch(setMenu(res.data))
        }

    }
}

export { getMneuList }
export default menuReducer