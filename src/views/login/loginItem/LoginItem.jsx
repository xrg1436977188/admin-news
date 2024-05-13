import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store//modules/user'

import { $forget } from "@/api/login";

export default function LoginItem() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [forgetPwd] = Form.useForm();
    const onFinish = async (values) => {
        await dispatch(login(values))
        navigate('/home')
    };
    const showDrawer = () => {
        setOpen(true)
    }

    useEffect(() => {
        // 判断是否登录
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/home')
        }
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])
    const onFinishPwd = async (values) => {
        const res = await $forget(values)
        if (res.status === 0) {
            message.success('密码重置成功')
            setOpen(false)
            forgetPwd.resetFields()
        }
    }
    return (
        <div>
            <Form
                layout="horizontal"
                name="login"

                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    style={{ marginBottom: '30px' }}
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
                    label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
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
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 18,
                    }}
                >
                    <Button type="primary" block htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
            <span style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}><a
                href="#" onClick={showDrawer}>忘记密码</a></span>
            <Drawer title="忘记密码" onClose={() => setOpen(false)} open={open}>
                <Form
                    layout="horizontal"
                    name="forgetPwd"

                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinishPwd}
                    autoComplete="off"
                    form={forgetPwd}
                >
                    <Form.Item
                        label="用户名"
                        style={{ marginBottom: '30px' }}
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
                        label="邮&nbsp;&nbsp;&nbsp;&nbsp;箱"
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
                        label="新密码"
                        name="password"
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
                            offset: 4,
                            span: 18,
                        }}
                    >
                        <Button style={{ marginLeft: '20px' }} type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button onClick={() => forgetPwd.resetFields()} style={{ marginLeft: '30px' }}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}
