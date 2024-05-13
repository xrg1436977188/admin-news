import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Space, Switch, message, Tag, Select, Input } from 'antd'

import { $getAllRoleList, $banAndHotUser, $searchRoleByAccount, $searchRoleByIdentity, $getIdentityCategory } from '@/api/role';
const { Search } = Input;
export default function LimitList() {
  const inputReff = useRef(null)//input表单实例
  const [select, setSelect] = useState([])//选择框
  const [userInfo, setUserInfo] = useState()//table
  const status_list = ['正常', '禁用']
  const color_list = ['green', 'red']
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => {
        return <Tag color={color_list[status]}>{status_list[status]}</Tag>
      }
    },
    {
      title: '身份',
      dataIndex: 'identity',
      key: 'identity',
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },

    {
      title: '操作',
      key: 'action',
      render: (data) => (
        <Space direction="vertical">
          <Switch checkedChildren="开启" unCheckedChildren="禁用" onChange={(checked) => onChange(checked, data.id)} checked={data.status === 0 ? true : false} />
        </Space>
      ),
      align: 'center',
    },
  ];
  // 头部搜索
  const onSearch = async (value) => {
    const res = await $searchRoleByAccount(value)
    setUserInfo(res.data)
  }
  // 头部选择框
  const handleChange = async (value) => {
    const res = await $searchRoleByIdentity(value)
    setUserInfo(res.data)
  };
  const onClear = () => {
    const getAllRoleList = async () => {
      const res = await $getAllRoleList();
      if (res.status === 0) {
        setUserInfo(res.data)
      }
    }
    getAllRoleList()
  }
  const reset = () => {
    const getAllRoleList = async () => {
      const res = await $getAllRoleList();
      if (res.status === 0) {
        setUserInfo(res.data)
      }
    }
    getAllRoleList()
  }


  const onChange = async (checked, id) => {
    if (checked) {
      const res = await $banAndHotUser({ id, status: 0 })
      if (res.status === 0) {
        message.success('禁用解除')
        getAllRoleList()
      }
    } else {
      const res = await $banAndHotUser({ id, status: 1 })
      if (res.status === 0) {
        message.success('用户账号被禁用')
        getAllRoleList()
      }
    }
  }
  const getAllRoleList = async () => {
    const res = await $getAllRoleList();
    if (res.status === 0) {
      setUserInfo(res.data)

    }
  }
  useEffect(() => {

    getAllRoleList()
  }, [])
  // 获取用户身份分类
  useEffect(() => {
    const getIdentityCategory = async () => {
      const res = await $getIdentityCategory()
      if (res.status === 0) {
        setSelect(res.data)
      }

    }
    getIdentityCategory()
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Search ref={inputReff} placeholder="请输入用户名" allowClear onSearch={onSearch} style={{ width: 260 }} />
        <Select options={select} onClear={onClear} allowClear placeholder="选择用户身份" style={{ width: 200, marginLeft: 20 }} onChange={handleChange} />
        <Button style={{ marginLeft: 20 }} type={'primary'} onClick={reset}>重置</Button>
      </div>
      <Table bordered={true} rowKey={'id'} dataSource={userInfo} columns={columns} />;

    </div>
  )
}
