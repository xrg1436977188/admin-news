import React from 'react';
import { Modal, Input, Button, Form, message, Select } from 'antd';
import { $addRole } from '@/api/role';
export default function Add({ addOpen, setAddOpen, getRoleList, select }) {
    const [form] = Form.useForm();// 表单实例

    // 
    const onOk = () => {
        setAddOpen(false)
    };
    // 取消
    const cannel = () => {
        setAddOpen(false)
    }
    // 提交
    const onFinish = async (values) => {
        const res = await $addRole(values)
        if (res.status === 0) {
            message.success('添加成功')
            setAddOpen(false)
            getRoleList()
            form.resetFields()
        }
    }
    return (
        <>
            <Modal
                title="添加角色"
                open={addOpen}
                onOk={onOk}
                onCancel={cannel}
                footer=""
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item
                        label="用户名"
                        name="account"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的用户名',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的密码',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="角色" name='identity' rules={[
                        {
                            required: true,
                            message: '请输入角色',
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
                        <Button onClick={() => form.resetFields()}>重置</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
