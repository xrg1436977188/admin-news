import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Popconfirm, Space, Tag, message, Input, Select } from 'antd';
import { $getTwoStatusList, $byIdupdateNewsTwoStatus, $deleteDraftBoxList, $getCategoryList, $byNewsTitleSearch, $byNewsCategorySearch } from '@/api/news'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
const { Search } = Input;
export default function DraftBox() {
  const input = useRef(null)
  const { identity } = useSelector(state => state.user.userInfo)//store存储的数据
  const [tableList, setTableList] = useState()//table
  const [select, setSelect] = useState([])//选择框
  const publish_status_list = ['未发布', '待发布', '已上线', '已下线']
  const audit_status_list = ['未审核', '审核中', '审核通过', '拒绝审核']
  const status_color_list = ['black', 'orange', 'green', 'red']
  // 获取草稿箱列表
  const getDraftBoxList = async () => {
    const res = await $getTwoStatusList()
    if (res.status === 0) {
      setTableList(res.data)
    }
  }
  //取消删除
  const deleteCancel = () => {
    message.error('删除取消')
  }
  // 删除
  const deleteSubmit = async (id) => {
    const res = await $deleteDraftBoxList(id)
    if (res.status === 0) {
      message.success('删除成功')
      getDraftBoxList()
    }
  }
  // 审核操作
  const audit = async (id) => {
    const res = await $byIdupdateNewsTwoStatus({
      audit_status: 1,
      publish_status: 1,
      id
    })
    if (res.status === 0) {
      message.success('审核成功')
      getDraftBoxList()
    }
  }
  // 取消审核
  const auditCannel = () => {
    message.error('取消审核')
  }
  // 头部搜索
  const onSearch = async (value) => {
    const res = await $byNewsTitleSearch(value)
    setTableList(res.data)
  }
  // 头部选择框
  const handleChange = async (value) => {
    const res = await $byNewsCategorySearch(value)
    setTableList(res.data)
  };
  const onClear = () => {
    const getAllRoleList = async () => {
      const res = await $getTwoStatusList();
      if (res.status === 0) {
        setTableList(res.data)
      }
    }
    getAllRoleList()
  }
  const reset = () => {
    const getAllRoleList = async () => {
      const res = await $getTwoStatusList();
      if (res.status === 0) {
        setTableList(res.data)
      }
    }
    getAllRoleList()
  }

  useEffect(() => {

    getDraftBoxList()
  }, [])
  // 获取用户身份分类
  useEffect(() => {
    const getCategoryList = async () => {
      const res = await $getCategoryList()
      if (res.status === 0) {
        setSelect(res.data)
      }

    }
    getCategoryList()
  }, [])
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
    // {
    //   title: '更新时间',
    //   dataIndex: 'update_time',
    //   key: 'update_time',
    //   align: 'center',
    //   width: 150,
    //   render: (update_time) => (
    //     <span>{update_time?dayjs(update_time).format('YYYY-MM-DD'):''}</span>
    //   )
    // },
    {
      title: '操作',
      key: 'action',
      render: (data) => (
        <Space size="small">
          <Button style={{ marginRight: 20 }} type='primary' onClick={() => {
            window.location.href = `/news_edit/${data.id}`
          }}>编辑</Button>
          <Popconfirm
            title="系统提示"
            description="你确定要删除吗?"
            onConfirm={() => deleteSubmit(data.id)}
            onCancel={deleteCancel}
            okText="确定"
            cancelText="取消"
          >
            <Button style={{ marginRight: 20 }} danger>删除</Button>
          </Popconfirm>

          <Popconfirm
            title="审核提示"
            description="你确定要审核通过吗?"
            onConfirm={() => audit(data.id)}
            onCancel={auditCannel}
            okText="确定"
            cancelText="取消"
          >
            <Button disabled={identity === '用户' || identity === '用户管理员' ? true : false} type='primary' ghost>审核</Button>
          </Popconfirm>

        </Space >
      ),
      fixed: 'right',
    },
  ];
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Search ref={input} placeholder="请输入标题关键字" allowClear onSearch={onSearch} style={{ width: 260 }} />
        <Select options={select} onClear={onClear} allowClear placeholder="选择新闻分类" style={{ width: 200, marginLeft: 20 }} onChange={handleChange} />
        <Button style={{ marginLeft: 20 }} type={'primary'} onClick={reset}>重置</Button>
      </div>
      <Table pagination={{ pageSize: '6' }} rowKey={'id'} bordered size='small' dataSource={tableList} columns={columns} />
    </div>
  )
}
