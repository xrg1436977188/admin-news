
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { $register } from '@/api/login'
import LoginItem from '../loginItem/LoginItem';
export default function RegisterItem() {
    const navigate = useNavigate()
    const [forms] = Form.useForm();
    const onFinish = async (values) => {
        const res = await $register(values)
        if (res.status === 0) {
            message.success('注册成功')
            forms.resetFields()
            navigate(<LoginItem />)
        } else {
            message.error('注册失败')
        }
    };
    return (
        <div>
            <Form
                form={forms}
                layout="horizontal"
                name="register"

                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
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
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
