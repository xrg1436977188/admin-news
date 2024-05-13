import React from 'react'
import { Table, Tag} from 'antd'
import dayjs from 'dayjs'
export default function NewsPublish(props) {
    const publish_status_list = ['未发布', '待发布', '已上线', '已下线']
    // const audit_status_list = ['未审核', '审核中', '审核通过', '拒绝审核']
    const status_color_list = ['black', 'orange', 'green', 'red']
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 100,
        },
        {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
            width: 150,
            render: (title, data) => (
                <a href={`/news_preview/${data.id}`}>{title}</a>
            )
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
            align: 'center',
            width: 150,
        },
        {
            title: '发布人',
            dataIndex: 'identity',
            key: 'identity',
            align: 'center',
            width: 150,
        },
        {
            title: '作者姓名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 150,

        },
        // {
        //     title: '审核状态',
        //     dataIndex: 'audit_status',
        //     key: 'audit_status',
        //     align: 'center',
        //     width: 100,
        //     render: (audit_status) => (
        //         <Tag color={status_color_list[audit_status]}>
        //             {audit_status_list[audit_status]}
        //         </Tag>
        //     )

        // },
        {
            title: '发布状态',
            dataIndex: 'publish_status',
            key: 'publish_status',
            align: 'center',
            width: 100,
            render: (publish_status) => (
                <Tag color={status_color_list[publish_status]}>
                    {publish_status_list[publish_status]}
                </Tag>
            )

        },

        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center',
            width: 150,
            render: (create_time) => (
                <span>{dayjs(create_time).format('YYYY-MM-DD')}</span>
            )
        },
        {
            title: '更新时间',
            dataIndex: 'update_time',
            key: 'update_time',
            align: 'center',
            width: 150,
            render: (update_time) => (
                <span>{update_time ? dayjs(update_time).format('YYYY-MM-DD') : ''}</span>
            )
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (data) => (
                <div>
                    {props.button(data.id)}
                </div>
            ),
            fixed: 'right',
        },
    ];

    return (
        <>
            <Table pagination={{ pageSize: 6 }
            } rowKey={'id'} bordered size='small' dataSource={props.tableList} columns={columns} />
        </>
    )
}
