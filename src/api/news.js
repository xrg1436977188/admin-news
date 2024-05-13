import { request } from "@/utils";
// 获取新闻分类
export const $getCategoryList = () => {
    return request({
        url: 'news/getCategoryList',
        method: 'post',
    })
}
// 创建新闻
export const $createNews = (data) => {
    const {
        title,
        category,
        content,
        identity,
        name,
        publish_status,
        audit_status,
    } = data
    return request({
        url: 'news/createNews',
        method: 'post',
        data: {
            title,
            category,
            content,
            identity,
            name,
            publish_status,
            audit_status,
        }
    })
}
// 通过status获取列表
export const $getTwoStatusList = () => {

    return request({
        url: 'news/getTwoStatusList',
        method: 'post',
    })
}
// 通过status更新列表
export const $byIdupdateNewsTwoStatus = (data) => {
    const {
        audit_status,
        publish_status,
        id
    } = data
    return request({
        url: 'news/byIdupdateNewsTwoStatus',
        method: 'post',
        data: {
            audit_status,
            publish_status,
            id
        }
    })
}
// 草稿箱列表-删除
export const $deleteDraftBoxList = (id) => {
    return request({
        url: 'news/deleteDraftBoxList',
        method: 'post',
        data: {
            id
        }
    })
}
// 草稿箱跳转详情页-获取文章列表
export const $getNewsDetail = (id) => {
    return request({
        url: 'news/getNewsDetail',
        method: 'post',
        data: {
            id
        }
    })
}

// 更新文章
export const $updateNews = (data) => {
    const {
        id,
        title,
        content,
        category,
        audit_status,
    } = data
    return request({
        url: 'news/updateNews',
        method: 'post',
        data: {
            id,
            title,
            content,
            category,
            audit_status,
        }
    })
}

// 获取审核列表
export const $newsAuditList = () => {
    return request({
        url: 'news/newsAuditList',
        method: 'post',
    })
}

// [审核列表]撤销操作
export const $auditRevoke = (id) => {
    return request({
        url: 'news/auditRevoke',
        method: 'post',
        data: {
            id
        }
    })
}
// [审核列表]发布操作
export const $auditPublish = (id) => {
    return request({
        url: 'news/auditPublish',
        method: 'post',
        data: {
            id
        }
    })
}
// [审核新闻列表]
export const $getAuditManageList = () => {
    return request({
        url: 'news/getAuditManageList',
        method: 'post',
    })
}
// [更新新闻分类]
export const $updateNewsCategory = (data) => {
    const { value, id } = data
    return request({
        url: 'news/updateNewsCategory',
        method: 'post',
        data: {
            value,
            id
        }
    })
}
// [删除新闻分类]
export const $deleteNewsCategory = (id) => {
    return request({
        url: 'news/deleteNewsCategory',
        method: 'post',
        data: {
            id
        }
    })
}

// 获取[0 未发布][待发布 1][已发布 2][已下线 3]新闻列表
export const $byStatusGetNews = (publish_status) => {
    return request({
        url: 'news/byStatusGetNews',
        method: 'post',
        data: {
            publish_status
        }
    })
}

// 修改[0 未发布][待发布 1][已发布 2][已下线 3]新闻状态
export const $byIdupdateNewsStatus = (data) => {
    const { publish_status, id } = data
    return request({
        url: 'news/byIdupdateNewsStatus',
        method: 'post',
        data: {
            publish_status,
            id
        }
    })
}

// [最多观看人数排序]-前提:已发布   5条
export const $getMaxViewOrderBy = () => {
    return request({
        url: 'news/getMaxViewOrderBy',
        method: 'post',
    })
}


// [最多点赞人数排序]-前提:已发布   5条
export const $getMaxStarOrderBy = () => {
    return request({
        url: 'news/getMaxStarOrderBy',
        method: 'post',
    })
}

// 获取各新闻分类的数量-前提:已发布
export const $getCategoryNumber = () => {
    return request({
        url: 'news/getCategoryNumber',
        method: 'post',
    })
}
// 游客模式,进入新闻详情页观看数量加1
export const $viewAutoAdd = (id) => {

    return request({
        url: 'news/viewAutoAdd',
        method: 'post',
        data: {
            id
        }
    })
}

// 游客模式,进入新闻详情页点击图标加1
export const $starAutoAdd = (id) => {

    return request({
        url: 'news/starAutoAdd',
        method: 'post',
        data: {
            id
        }
    })
}
// 根据新闻分类进行筛选并获取新闻分类的所有信息-前提:已发布
export const $getCategoryAndInfo = (category) => {
    return request({
        url: 'news/getCategoryAndInfo',
        method: 'post',
        data: {
            category
        }
    })
}

// 添加新闻分类
export const $addNewsCategory = (title) => {
    return request({
        url: 'news/addNewsCategory',
        method: 'post',
        data: {
            title
        }
    })
}

// 添加新闻分类
export const $getNewsTotal = () => {
    return request({
        url: 'news/getNewsTotal',
        method: 'post',
    })
}


// 添加新闻分类
export const $getNewsStatusTotal = () => {
    return request({
        url: 'news/getNewsStatusTotal',
        method: 'post',

    })
}


// 添加新闻分类
export const $getAuditStatusTotal = () => {
    return request({
        url: 'news/getAuditStatusTotal',
        method: 'post',

    })
}

// 添加新闻分类
export const $byOneCategoryGetList = (id = 3) => {
    return request({
        url: 'news/byOneCategoryGetList',
        method: 'post',
        data: {
            id
        }

    })
}

// 通过新闻标题获取新闻列表
export const $byNewsTitleSearch = (title) => {
    return request({
        url: 'news/byNewsTitleSearch',
        method: 'post',
        data: {
            title
        }

    })
}


// 通过新闻分类获取新闻列表
export const $byNewsCategorySearch = (category) => {
    return request({
        url: 'news/byNewsCategorySearch',
        method: 'post',
        data: {
            category
        }

    })
}


