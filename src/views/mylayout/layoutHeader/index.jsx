import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Dropdown, Space, Avatar, Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { removeToken } from '@/utils';
const { Header } = Layout;

export default function LayoutHeader({ collapsed, setCollapsed }) {
    const { account,image_url,identity } = useSelector(state => state.user.userInfo)//store存储的数据
    const [open, setOpen] = useState(false);//弹窗
    const navigate = useNavigate()
    const items = [
        {
            label: identity,
            key: '1',
        },
        {
            label: '个人信息',
            key: '2',
        },
        {
            label: '退出登录',
            key: '3',
        },

    ];
    const onClick = (value) => {
        if (value.key == 1) {
            alert('您的身份是' + identity+'哦')
        }
        if (value.key == 2) {
            navigate('/userInfo')
        }
        if (value.key == 3) {
            setOpen(true)
        }
    }

    const onOk = () => {
        removeToken()
        message.success('退出成功')
        localStorage.clear()
        navigate('/login')
    };
    const OnCancle = () => {
        setOpen(false);
        message.warning('取消退出')
    };
    return (
        <div>
            <Header
                style={{
                    padding: 0,
                    background: '#eee'
                }}
            >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <Dropdown className='dropdown'
                    menu={{ items, onClick }} trigger={['click']} >
                    <div>
                        <span style={{ marginRight: '15px' }}>{account}</span>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar shape="square" size="large" src={image_url} icon={<UserOutlined />} />
                                <DownOutlined />
                            </Space>
                        </a>
                    </div>
                </Dropdown>
            </Header>
            <Modal
                title="温馨提示"
                open={open}
                onOk={onOk}
                onCancel={OnCancle}
                okText="确认"
                cancelText="取消"
            >
                <p>你确定要退出吗?</p>
            </Modal>
        </div>

    );
};