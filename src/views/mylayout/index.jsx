import './index.scss'
import React, { useEffect, useState } from 'react';
import SliderMenu from './sliderMenu'
import LayoutHeader from './layoutHeader';
import { Layout, message, Breadcrumb } from 'antd';
import { $ByIdentityGetMenu } from '@/api/menu'
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
const { Content } = Layout;
const MyLayout = () => {
    const { id } = useSelector(state => state.user.userInfo)
    const location = useLocation()
    const path = location.pathname
    const path1='/'+ path.split('/')[1]
    const path2=path
    const [collapsed, setCollapsed] = useState(false);//侧边栏是否折叠
    const navigate = useNavigate();
    const [breadCrumb,setBreadCrumb] = useState({})
    const breadCrumbList = [
        {
            title: breadCrumb[path1],
        },
        {
            title: breadCrumb[path2],
        }
    ]

    useEffect(() => {
        const getMenu = async () => {
            const res = await $ByIdentityGetMenu(id)
            let result = {};
            res.data?.forEach(item => {
                result[item.key] = item.label;
                if (item.children) {
                    item.children.forEach(child => {
                        result[child.key] = child.label;
                    });
                }
            });
            setBreadCrumb(result)
        }
        getMenu()
    }, [])



    return (
        <Layout className={'layout'}>
            <SliderMenu collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
                <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
                <div style={{ height: '50px', width: '100%' }}>
                    <Breadcrumb style={{ lineHeight: '50px', fontSize: '20px', marginLeft: '20px' }} items={breadCrumbList} />
                </div>
                <Content
                    style={{
                        margin: '10px',
                        padding: 10,
                        minHeight: 280,
                        background: "#eee",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MyLayout;