import {request} from "@/utils";
// 登录
export const $login = (data) => {
    const {account, password} = data;
    return request({
        url: 'api/login',
        method: 'post',
        data: {
            account,
            password
        }
    })
}
// 注册
export const $register = (data) => {
    const {account, password} = data;
    return request({
        url: 'api/register',
        method: 'post',
        data: {
            account,
            password
        }
    })
}

// 忘记密码
export const $forget = (data) => {
    const {account, email, password} = data;
    return request({
        url: 'api/$forget',
        method: 'post',
        data: {
            account,
            email,
            password
        }
    })
}