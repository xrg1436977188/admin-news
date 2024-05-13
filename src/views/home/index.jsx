import React, { useEffect, useState, } from 'react';
import { Row, Col, Card, List, Avatar, Modal, Tag, message } from 'antd';
import { StatisticCard, ProCard } from '@ant-design/pro-components';
import { FolderViewOutlined, UserOutlined } from '@ant-design/icons';
import { $getMaxViewOrderBy, $getMaxStarOrderBy,$getNewsStatusTotal,$getAuditStatusTotal,$getNewsTotal } from '@/api/news';
import info from '../../assets/images/info.png'
import { getMneuList } from '@/store/modules/menu'
import { useSelector,useDispatch} from 'react-redux';
const { Meta } = Card;
const { Divider } = StatisticCard;

export default function Home() {
    const dispatch = useDispatch()
    const { name, identity, image_url, account, sex, intro, id } = useSelector(state => state.user.userInfo)//store存储的数据
    const [vieworder, setViewOrder] = useState([])//用户观看热度
    const [starorder, setStarOrder] = useState([])//用户点赞热度
    const [isModalOpen, setIsModalOpen] = useState(false);//新闻详情弹窗
    const [userInfoOpen, setUserInfoOpen] = useState(false);//用户信息弹窗新闻详情弹窗
    const [publish, setPublish] =useState([])
    const [audit, setAudit] =useState([])
    const [total, setTotal] =useState()
    // 获取新闻观看热度
    useEffect(() => {
        const getMaxViewOrderBy = async () => {
            const res = await $getMaxViewOrderBy()
            if (res.status === 0) {
                setViewOrder(res.data)
            }
        }
        // 获取新闻点赞热度
        const getMaxStarOrderBy = async () => {
            const res = await $getMaxStarOrderBy()
            if (res.status === 0) {
                setStarOrder(res.data)
            }
        }
        getMaxViewOrderBy()
        getMaxStarOrderBy()
    }, [])
    useEffect(()=>{
        const getMneuListFun = async () => {
            dispatch(getMneuList(id))

        }
        getMneuListFun()
    },[])


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showUserInfo = () => {
        setUserInfoOpen(true)
    }


    useEffect(()=>{
        const getNewsStatusTotal = async () => {
            const res = await $getNewsStatusTotal()
            if (res.status === 0) {
                setPublish(res.data)
            }
        }
        const getAuditStatusTotal = async () => {
            const res = await $getAuditStatusTotal()
            if (res.status === 0) {
                setAudit(res.data)
            }
        }
        const getNewsTotal = async () => {
            const res = await $getNewsTotal()
            if (res.status === 0) {
                setTotal(res.total)
            }
        }
        getNewsStatusTotal()
        getAuditStatusTotal()
        getNewsTotal()
    },[])
    return (
        <>
            <Row gutter={16}>
                <Col span={9}>
                    <Card title="用户观看热度" bordered={true}>
                        <List
                            bordered
                            dataSource={vieworder}
                            renderItem={(vieworder) => (
                                <List.Item>
                                    <a href={`/news_preview/${vieworder.id}`}>{vieworder.title}</a>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={9}>
                    <Card title="用户点赞热度" bordered={false}>

                        <List
                            bordered
                            dataSource={starorder}
                            renderItem={(starorder) => (
                                <List.Item>
                                    <a href={`/news_preview/${starorder.id}`}>{starorder.title}</a>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src={info}
                            />
                        }
                        actions={[
                            <FolderViewOutlined size={30} key="setting" onClick={showModal} />,
                            <UserOutlined size={30} key="ellipsis" onClick={showUserInfo} />,

                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={image_url} />}
                            title={identity}
                            description={
                                <div>
                                    <span>{name}</span>
                                </div>
                            }
                        />
                    </Card>
                </Col>
            </Row>
            <Modal title="新闻详情" width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认"
                cancelText="取消">
                <StatisticCard.Group>
                    <StatisticCard
                        statistic={{
                            title: '全部新闻',
                            tip: '所有新闻数量',
                            value: total,
                        }}
                    />
                    <Divider />
                    <StatisticCard
                        statistic={{
                            title: '未发布',
                            value: publish[0]?.total,
                            status: 'default',
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '待发布',
                            value: publish[1]?.total,
                            status: 'processing',
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '发布成功',
                            value: publish[2]?.total,
                            status: 'success',
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '已下线',
                            value: publish[3]?.total,
                            status: 'error',
                        }}
                    />
                </StatisticCard.Group>
                <StatisticCard.Group>
                    <StatisticCard
                        statistic={{
                            title: '全部审核',
                            tip: '所有审核的新闻数量',
                            value: total,
                        }}
                    />
                    <Divider />
                    <StatisticCard
                        statistic={{
                            title: '未审核',
                            value: audit[0]?.total,
                            status: 'default',
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '待审核',
                            value: audit[1]?.total,
                            status: 'processing',
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '审核通过',
                            value: audit[2]?.total,
                            status: 'success',
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '拒绝审核',
                            value: audit[3]?.total,
                            status: 'error',
                        }}
                    />
                </StatisticCard.Group>
            </Modal>
            <Modal title="用户身份卡片" open={userInfoOpen} onOk={() => { setUserInfoOpen(false) }} onCancel={() => { setUserInfoOpen(false) }} okText="确认"
                cancelText="了解了">
                <ProCard style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}
                    boxShadow>
                    <div>用户ID<br></br><Tag color='green'>{id}</Tag></div>
                    <div>用户名<br></br><Tag color='blue'>{account}</Tag></div>
                    <div>用户身份<br></br><Tag color='pink'>{identity}</Tag></div>
                    <div>用户姓名<br></br><Tag color='orange'>{name}</Tag></div>
                    <div>用户性别<br></br><Tag color='#cc9999'>{sex}</Tag></div>
                    <div>个人说明<br></br><Tag color='#99ffcc'>{intro}</Tag></div>
                </ProCard>
            </Modal>

        </>
    )
}