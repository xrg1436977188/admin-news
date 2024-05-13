import {request} from "@/utils";
// 获取菜单列表
export const $getMenus = () => {
    return request({
        url: 'menu/getMenus',
        method: 'POST',
    })
}
// 获取菜单权限列表
export const $getLimitMenus = () => {
    return request({
        url: 'menu/getLimitMenus',
        method: 'POST',
    })
}

// 不同身份获取不同路由 -通过id获取身份
export const $ByIdentityGetMenu = (id) => {
    return request({
        url: 'menu/ByIdentityGetMenu',
        method: 'POST',
        data:{
            id
        }
    })
}