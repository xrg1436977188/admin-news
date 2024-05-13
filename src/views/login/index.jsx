import React from 'react';
import './index.scss'
import { Tabs, Card, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import LoginItem from './loginItem/LoginItem'
import RegisterItem from './registerItem/RegisterItem'
const { Header, Footer, Content } = Layout;
function Login() {
    const navigate = useNavigate()
    const onChange = (key) => {
        if (key === '登录') {
            navigate(<LoginItem />)
        } else {
            navigate(<RegisterItem />)
        }
    };
    const items = [
        {
            key: '登录',
            label: '登录',
            children: <LoginItem />,
        },
        {
            key: '注册',
            label: '注册',
            children: <RegisterItem />,
        },
    ];
    return (
        <>

            <Layout >
                <Header className='header'>
                    {/* <div style={{ background: '#99ffcc', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center',margin:'0 auto' }}>
                        <div style={{ fontSize: '16' }}>测试账号:admins       密码:111111</div>
                    </div> */}
                    <div className='header_content'>
                        <h1>新闻发布管理系统</h1>
                        <div>
                            <span style={{ marginRight: '30px', fontSize: '16px' }}><a href='/tourist'>游客访问</a></span>
                            <span>欢迎您的登录</span>

                        </div>


                    </div>
                </Header>
                <Content className='content'>
                    <div className='content_card'>
                        <Card className='cart_card'>
                            <Tabs defaultActiveKey="登录" centered={true} tabBarGutter={200} indicator={{ size: 200 }} items={items} onChange={onChange} />
                        </Card>
                    </div>
                </Content>
                <Footer className='footer' style={{ padding: '0', backgroundColor: 'rgba(255,255,255)' }}>
                    <div className='footer_content'>
                        <h2>React 社区</h2>
                        <span>Copyright © 2024-2025</span>
                    </div>
                </Footer>
            </Layout>
        </>
    )
}

export default Login
