
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import { StarOutlined, createFromIconfontCN } from '@ant-design/icons'
import { $ByIdentityGetMenu } from '@/api/menu'
import { useSelector } from 'react-redux';
const { Sider } = Layout;

export default function SliderMenu({ collapsed }) {
    const { id } = useSelector(state => state.user.userInfo)
    const navigate = useNavigate();
    const location = useLocation()
    const selectedKeys = [location.pathname]
    const openKeys = ['/' + location.pathname.split('/')[1]]
    const [menu, setMenu] = useState([])
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/c/font_4541881_8rdporjthto.js',
    })
    // console.log(IconFont);
    // 点击跳转路由
    const onclickMenu = (e) => {
        navigate(e.key)
    }
    function addIconToMenu(menuList) {
        for (let i = 0; i < menuList.length; i++) {
            if (menuList[i].icon) {
                menuList[i].icon = <IconFont type={menuList[i].icon} style={{ fontSize: '25px' }} />
            }
            if (menuList[i].children) {
                menuList[i].children = addIconToMenu(menuList[i].children)
            }
        }
        return menuList
    }

    useEffect(() => {
        const getMenu = async () => {
            const res = await $ByIdentityGetMenu(id)
            if (res.status === 0) {
                setMenu(addIconToMenu(res.data))
            }
        }
        getMenu()
    }, [])
    return (
        <Sider width={300} theme={'dark'} trigger={null} collapsible collapsed={collapsed}>
            <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
                <div className="logo" style={{ display: 'flex', padding: '0', justifyContent: 'center', alignItems: 'center' }}>
                    {collapsed ? <IconFont type='icon-logo' style={{ fontSize: '60px' }} /> : <>
                        <IconFont type='icon-logo' style={{ fontSize: '60px', marginRight: '10px' }} />
                        <span style={{ fontSize: '20px', color: '#fff' }}>新闻发布管理系统</span>
                    </>}
                </div>
                <div style={{ 'overflow': 'auto', 'flex': 1 }}>
                    <Menu
                        itemIcon={<StarOutlined />}
                        theme="dark"
                        mode="inline"
                        items={menu}
                        onClick={onclickMenu}
                        selectedKeys={selectedKeys}
                        defaultOpenKeys={openKeys}

                    />
                </div>
            </div>
        </Sider>
    )
}
