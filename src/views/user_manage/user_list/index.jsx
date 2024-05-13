import React, { useEffect, useRef, useState } from 'react'
import { Select, Input, Button, Table, Tag } from 'antd';
import { $getAllRoleList, $getIdentityCategory, $searchRoleByAccount, $searchRoleByIdentity } from '../../../api/role'
import dayjs from 'dayjs';
const { Search } = Input;
export default function UserList() {
  // const [isOpen, setIsOpen] = useState(false);//添加和编辑
  const [roleList, setRoleList] = useState()//tabel表格
  const [identityList, setIdentityList] = useState([])//头部选择框
  const audit_status_list = ['正常', '禁用']
  const status_color_list = ['green', 'red']
  const input1 = useRef(null)//实例
  // 搜索框
  const onSearch = async (value) => {
    const res = await $searchRoleByAccount(value)
    if (res.status === 0) {
      setRoleList(res.data)
    }
  }
// 获取table数据
  const getRoleList = async () => {
    const res = await $getAllRoleList()
    if (res.status === 0) {
      setRoleList(res.data)
    }
  }
  // 头部选择框
  const handleChange = async (value) => {
    const res = await $searchRoleByIdentity(value)
    if (res.status === 0) {
      setRoleList(res.data)
    }
  };
  // 重置
  const reset = () => {
    getRoleList()
  }
  // 获取头部选择框数据
  useEffect(() => {
    const getIdentityCategory = async () => {
      const res = await $getIdentityCategory()
      if (res.status === 0) {
        setIdentityList(res.data)
      }
    }
    getIdentityCategory()
  }, [])
  useEffect(() => {

    getRoleList()
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
      title: '用户名',
      dataIndex: 'account',
      key: 'account',
      align: 'center',
      width: 150,
    },
    // {
    //   title: '密码',
    //   dataIndex: 'password',
    //   key: 'account',
    //   align: 'center',
    //   width: 150,
    // },
    {
      title: '角色',
      dataIndex: 'identity',
      key: 'identity',
      align: 'center',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 150,
      render: (status) => (
        <span>
          <Tag color={status_color_list[status]}>{audit_status_list[status]}</Tag>
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      width: 150,
      render: (create_time) => {
        return dayjs(create_time).format('YYYY-MM-DD')
      }
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      align: 'center',
      width: 150,
      render: (update_time) => {
        return (
          <div>
            {update_time ? dayjs(update_time).format('YYYY-MM-DD') : ''}
          </div>
        )
      }
    },
  ];


  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Search ref={input1} placeholder="请输入用户名" allowClear onSearch={onSearch} style={{ width: 250, }} />
        <Select placeholder='请选择角色身份' style={{ width: 200, marginLeft: 20 }} onChange={handleChange}
          options={identityList}
        />
        <Button style={{ marginLeft: 20 }} type={'primary'} onClick={reset}>重置</Button>
      </div>
      <Table rowKey={'id'} bordered size='small' dataSource={roleList} columns={columns} />;
    </>
  )
}
