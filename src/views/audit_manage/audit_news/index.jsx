import React, { useEffect, useState } from 'react'
import { $getAuditManageList, $byIdupdateNewsTwoStatus } from '@/api/news'
import { Table, Tag, Button, Space, Popconfirm, message } from 'antd'
import dayjs from 'dayjs'
export default function AuditNews() {
  // const publish_status_list = ['未发布', '待发布', '已上线', '已下线']
  const audit_status_list = ['未审核', '审核中', '审核通过', '拒绝审核']
  const status_color_list = ['black', 'orange', 'green', 'red']
  const [tableList, setTableList] = useState([])
  const agreeCancel = () => {
    message.error('取消通过')
  }

  const agree = async (id) => {
    const res = await $byIdupdateNewsTwoStatus({
      audit_status: 2,
      publish_status: 1,
      id
    })
    if (res.status === 0) {
      getAuditManageList()
      message.success('审核通过成功')
    }
  }
  const reject = async (id) => {
    const res = await $byIdupdateNewsTwoStatus({
      audit_status: 0,
      publish_status: 0,
      id
    })
    if (res.status === 0) {
      getAuditManageList()
      message.success('审核驳回成功')
    }
  }
  const rejectCannel = () => {
    message.error('取消驳回')
  }
  useEffect(() => {

    getAuditManageList()
  }, [])
  const getAuditManageList = async () => {
    const res = await $getAuditManageList()
    setTableList(res.data)
  }
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
    {
      title: '审核状态',
      dataIndex: 'audit_status',
      key: 'audit_status',
      align: 'center',
      width: 100,
      render: (audit_status) => (
        <Tag color={status_color_list[audit_status]}>
          {audit_status_list[audit_status]}
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
      render: (data) => (
        <Space size="small">
          <Popconfirm
            title="发布提示"
            description="你确定要发布吗?"
            onConfirm={() => agree(data.id)}
            onCancel={agreeCancel}
            okText="确定"
            cancelText="取消"
          >
            <Button disabled={data.audit_status === 2} type='primary' style={{ marginRight: 20 }} ghost>通过</Button>
          </Popconfirm>

          <Popconfirm
            title="驳回提示"
            description="你确定要驳回吗?"
            onConfirm={() => reject(data.id)}
            onCancel={rejectCannel}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>驳回</Button>
          </Popconfirm>

        </Space >
      ),
      fixed: 'right',
    },
  ];
  return (
    <div>
      <Table pagination={{pageSize:6}} rowKey={'id'} bordered size='small' dataSource={tableList} columns={columns} />
    </div>
  )
}
