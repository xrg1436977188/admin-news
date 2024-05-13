import React, { useEffect, useState } from 'react'
import { Row, Col, Card, List, Button } from 'antd'
import { $getCategoryAndInfo } from '@/api/news'
import { useNavigate } from 'react-router-dom'
export default function Tourist() {
    const [categoryList, setCategoryList] = useState([])//分类列表
    const navigate = useNavigate()
    // 获取分类列表
    useEffect(() => {
        $getCategoryAndInfo().then(res => {
            console.log(res.data);
            setCategoryList(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const onClick = () => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        } else {
            navigate('/login')
        }
    }
    return (
        <>
            <div style={{ width: '100%', height: '100%', background: '#eee' }}>
                <Row gutter={[16, 16]}>
                    {categoryList.map((item) =>
                        <Col span={8} key={item.key}>
                            <Card title={item.label + '模块'} hoverable={true}>
                                <List
                                    bordered={true}
                                    dataSource={item.children}
                                    pagination={{
                                        pageSize: 5,
                                    }}
                                    renderItem={(data) => (
                                        <List.Item>
                                            <a href={`/tourist/detail/${data.key}`}>{data.label}</a>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    )}

                </Row>

            </div>
            <div style={{ position: 'fixed', bottom: '10px', right: '10px',border: '1px solid #ccc',borderRadius:'5px', padding: '10px', background: '#fff'}}><Button type='primary' onClick={onClick
                
            }>回到原始位置</Button></div>

        </>
    )
}
