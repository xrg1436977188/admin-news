import React, { useEffect, useState, useRef } from 'react'
import dayjs from 'dayjs';
import { Select, Input, Button, Table, Space, Tag, Popconfirm, message, Drawer, Form, } from 'antd';
import { $getRoleList, $editRole, $getRoleUserInfo, $deleteRole, $getIdentityCategory, $searchRoleByAccount, $searchRoleByIdentity, $updateRolePwd } from '@/api/role'
import Add from './Add';
import { useSelector} from 'react-redux'
const { Search } = Input;
export default function RoleManage() {
  const {identity } = useSelector(state => state.user.userInfo)//store存储的数据
  const inputRef = useRef(null)//input表单实例
  const [addOpen, setAddOpen] = useState(false);//添加
  const [editOpen, setEditOpen] = useState(false);//编辑
  const [userInfo, setUserInfo] = useState()//table
  const [updatePwd, setUpdatePwd] = useState('');//更新密码
  const [select, setSelect] = useState([])//选择框
  const [userId, setUserId] = useState('')//获取用户id
  const [form] = Form.useForm();//form表单实例
  const [formEditRef] = Form.useForm()//form表单实例


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
  // 删除
  const confirm = (id) => {
    $deleteRole(id).then(() => {
      message.success('删除成功');
      getRoleList()
    }).catch(err => {
      message.error('删除失败');
      console.log(err);
    })

  };
  // 取消删除
  const cancel = (e) => {
    message.error('删除失败');
  };
  // 头部重置
  const reset = () => {
    const getRoleList = async () => {
      const res = await $getRoleList();
      if (res.status === 0) {
        setUserInfo(res.data)
      }
    }
    getRoleList()

  }
  // 获取table列表数据
  const getRoleList = async () => {
    const res = await $getRoleList();
    if (res.status === 0) {
      setUserInfo(res.data)
    }
  }
  // 关闭修改密码弹窗
  const onClose = () => {
    setUpdatePwd(false);
  };
  // 重置密码
  const resetPwd = (value) => {
    setUserId(value)
    setUpdatePwd(true);

  }
  // 修改密码
  const onFinish = async (value) => {
    form.validateFields().then(async () => {
      let obj = {
        id: userId,
        newPassword: value.newPassword,
        oldPassword: value.oldPassword
      }
      const res = await $updateRolePwd({ id: userId, ...obj });
      if (res.status === 0) {
        message.success('密码修改成功')
        form.resetFields()
        setUpdatePwd(false)
      }
    }).catch(error => {
      message.success('密码修改失败')
      console.log(error);
    })
  }
  // 清空恢复table数据
  const onClear = () => {
    const getRoleList = async () => {
      const res = await $getRoleList();
      if (res.status === 0) {
        setUserInfo(res.data)
      }
    }
    getRoleList()
  }
  // 添加角色
  const addRole = () => {
    setAddOpen(true);
  }
  // 编辑角色
  const editRole = async (id) => {
    setUserId(id)
    setEditOpen(true);
    const res = await $getRoleUserInfo(id);
    if (res.status === 0) {
      formEditRef.setFieldsValue({
        identity: res.data[0].identity,
        name: res.data[0].name,
        sex: res.data[0].sex,
        email:res.data[0].email,
      })
    }
  }
  const finishEdit = (value) => {
    formEditRef.validateFields().then(async () => {
      const res = await $editRole({ id: userId, ...value })
      if (res.status === 0) {
        message.success('修改成功')
        setEditOpen(false)
        getRoleList()
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  // 获取table用户信息
  useEffect(() => {

    getRoleList()
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
  const editClose = () => {
    setEditOpen(false)
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
      title: '用户名',
      dataIndex: 'account',
      key: 'account',
      align: 'center',
      width: 200,
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 200,
    },
    {
      title: '角色',
      dataIndex: 'identity',
      key: 'identity',
      align: 'center',
      width: 200,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      align: 'center',
      width: 200,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: 200,
    },
    {
      title: '头像',
      dataIndex: 'image_url',
      key: 'image_url',
      align: 'center',
      width: 200,
      render: (image_url) => (
        <img src={image_url} alt="" style={{ width: 50, height: 50 }} />
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 200,
      render: (data) => (
        <Tag color={'green'}>
          正常
        </Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      width: 200,
      render: (create_time) => (
        <span>{dayjs(create_time).format('YYYY-MM-DD')}</span>
      )
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      align: 'center',
      width: 200,
      render: (update_time) => {
        return (
          <div>
            {update_time ? dayjs(update_time).format('YYYY-MM-DD') : ''}
          </div >
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (data) => (
        <Space size="small">
          <Button  style={{ marginRight: 20 }} type='primary' onClick={() => editRole(data.id)}>编辑</Button>
          <Popconfirm
            title="系统提示"
            description="你确定要删除吗?"
            onConfirm={() => confirm(data.id)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button   style={{ marginRight: 20 }} danger>删除</Button>
          </Popconfirm>

          <Button  type="link" onClick={() => resetPwd(data.id)}>重置密码</Button>
        </Space>
      ),
      align: 'center',
      fixed: 'right',
    },
  ];
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Search ref={inputRef} placeholder="请输入用户名" allowClear onSearch={onSearch} style={{ width: 260 }} />
        <Select options={select} onClear={onClear} allowClear placeholder="选择用户身份" style={{ width: 200, marginLeft: 20 }} onChange={handleChange} />
        <Button style={{ marginLeft: 20 }} type={'primary'} onClick={reset}>重置</Button>
        <Button size='large' style={{ float: 'right', marginRight: 20 }}
          type={'primary'} onClick={() => addRole()}>添加</Button>
      </div>
      <Table rowKey={'id'} pagination={{
        pageSize: 6,
      }} bordered size='small' dataSource={userInfo} columns={columns} />
      <Add addOpen={addOpen} setAddOpen={setAddOpen} getRoleList={getRoleList} select={select} />

      <Drawer name='update' title="修改密码" onClose={onClose} open={updatePwd}>
        <Form name='update' layout="vertical" onFinish={onFinish} form={form} >
          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: '请输入你的旧密码',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              {
                required: true,
                message: '请输入你的新密码',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button style={{ marginRight: '30px' }} type="primary" htmlType="submit">确认</Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Form.Item>
        </Form>
      </Drawer >
      <Drawer name='edit' title="编辑用户信息" onClose={editClose} open={editOpen}>
        <Form name='edit' layout="vertical" onFinish={finishEdit} form={formEditRef}>
          <Form.Item label="角色" name='identity' rules={[
            {
              required: true,
              message: '请选择角色',
            },
          ]}>
            <Select>
              {select.map((item) => {
                return <Select.Option value={item.value} key={item.id}>{item.label}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入你的姓名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="性别" name='sex' rules={[
            {
              required: true,
              message: '请输入性别',
            },
          ]}>
            <Select>
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: '请输入你的邮箱',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button style={{ marginRight: '30px' }} type="primary" htmlType="submit">确认</Button>
            <Button onClick={() => formEditRef.resetFields()}>重置</Button>
          </Form.Item>
        </Form>
      </Drawer>

    </>
  )
}
