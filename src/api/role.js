import {request} from "@/utils";
// 根据id获取角色信息
export const $getRoleUserInfo = (id) => {
    return request({
        url: "/role/getRoleUserInfo",
        method: "POST",
        data: {
            id
        }
    });
};

// 获取所有角色列表
export const $getAllRoleList = () => {
    return request({
        url: "/role/getAllRoleList",
        method: "POST",
    });
};
// 获取角色列表
export const $getRoleList = () => {
    return request({
        url: "/role/getRoleList",
        method: "POST",
    });
};

// 添加角色
export const $addRole = (data) => {
    const {account, password, identity, name, sex} = data
    return request({
        url: "/role/addRole",
        method: "POST",
        data: {
            account,
            password,
            identity,
            name,
            sex
        }
    });
};
// 删除角色
export const $deleteRole = (id) => {
    return request({
        url: "/role/deleteRole",
        method: "POST",
        data: {
            id
        }
    });
};

// 编辑角色
export const $editRole = (data) => {
    const {identity, name, sex, id} = data;
    return request({
        url: "/role/editRole",
        method: "POST",
        data: {
            identity, name, sex, id
        }
    });
};

// account搜索角色
export const $searchRoleByAccount = (account) => {
    return request({
        url: "/role/searchRoleByAccount",
        method: "POST",
        data: {
            account
        }
    });
};
// identity搜索角色
export const $searchRoleByIdentity = (identity) => {
    return request({
        url: "/role/searchRoleByIdentity",
        method: "POST",
        data: {
            identity
        }
    });
};
// 更新角色密码
export const $updateRolePwd = (data) => {
    const {oldPassword, newPassword, id} = data;
    return request({
        url: "/role/updateRolePwd",
        method: "POST",
        data: {
            oldPassword,
            newPassword,
            id
        }
    });
};
// 角色身份列表
export const $getIdentityCategory = () => {
    return request({
        url: "/role/getIdentityCategory",
        method: "POST",
    });
};
// 更新角色身份
export const $updateIdentityCategory = () => {
    return request({
        url: "/role/updateIdentityCategory",
        method: "POST",
    });
};
// 删除角色身份
export const $deleteIdentityCategory = (id) => {
    return request({
        url: "/role/deleteIdentityCategory",
        method: "POST",
        data: {
            id
        }
    });
};
// 添加角色身份
export const $addIdentityCategory = (value) => {
    return request({
        url: "/role/addIdentityCategory",
        method: "POST",
        data: {
            value
        }
    });
};
// 更新个人信息
export const $updateSelfUserInfo = (data) => {
    const {
        id,
        name,
        identity,
        sex,
        intro
    } = data
    return request({
        url: "/role/updateSelfUserInfo",
        method: "POST",
        data: {
            id,
            name,
            identity,
            sex,
            intro
        }
    })
}

// 绑定账号
export const $bindAccount = (data) => {
    const {
        account,
        onlyId,
        url
    } = data
    return request({
        url: "/role/bindAccount",
        method: "POST",
        data: {
            account,
            onlyId,
            url
        }
    });
};

// 绑定账号
export const $banAndHotUser = (data) => {
    const {
        status,
        id
    } = data
    return request({
        url: "/role/banAndHotUser",
        method: "POST",
        data: {
            status,
            id
        }
    });
};

