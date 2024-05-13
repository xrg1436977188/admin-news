import React, { useEffect, useState } from 'react'
import { PageHeader } from '@ant-design/pro-components';
import { useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { $getNewsDetail } from '@/api/news'
import { Tag } from 'antd';
import dayjs from 'dayjs';
import './NewsPreview.scss';
export default function NewsPreview() {
    const [newsDetail, setNewsDetail] = useState({})//新闻详情
    const { id } = useParams();//新闻id
    const publish_status_list = ['未发布', '待发布', '已上线', '已下线']
    const audit_status_list = ['未审核', '审核中', '审核通过', '拒绝审核']
    const status_color_list = ['black', 'orange', 'green', 'red']
    //获取新闻详情
    useEffect(() => {
        const getNewsDetail = async () => {
            const res = await $getNewsDetail(id);
            if (res.status === 0) {
                setNewsDetail(res.data[0])
            }
        }
        getNewsDetail()
    }, [id])
    return (
        <>
            <PageHeader
                size='large'
                title={newsDetail?.title}
                subTitle={newsDetail?.category}
                onBack={() => window.history.back()}
                backIcon={<ArrowLeftOutlined style={{ fontSize: '30px' }} />}
                footer={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className='items' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>创建者: {newsDetail.name}</div>
                            <div>创建时间:   {dayjs(newsDetail.create_time).format('YYYY-MM-DD')}</div>
                            <div>更新时间:   {newsDetail.update_time ? dayjs(newsDetail.update_time).format('YYYY-MM-DD') : '暂无更新'}</div>
                            <div>身份:   {newsDetail.identity}</div>
                            <div>审核状态:  <Tag color={status_color_list[newsDetail.audit_status]}> {audit_status_list[newsDetail.audit_status]}</Tag></div>
                            <div>发布状态:   <Tag color={status_color_list[newsDetail.publish_status]}> {publish_status_list[newsDetail.publish_status]}</Tag> </div>
                            <div>访问数量:   {newsDetail.view}</div>
                            <div>点赞数量:   {newsDetail.star}</div>
                        </div>
                        <div style={{ width: '85%', height: '100%', padding: '20px', fontSize: '20px' }}>文章内容:
                            <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }} dangerouslySetInnerHTML={{ __html: newsDetail.content }}>

                            </div>
                        </div>

                    </div>
                }
            />
        </>
    )
}
