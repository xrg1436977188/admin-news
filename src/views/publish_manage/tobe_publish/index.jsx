import React from 'react'
import NewsPublish from '@/components/NewsPublish'
import { $byIdupdateNewsTwoStatus, $byStatusGetNews } from '@/api/news'
import usePublish from '@/hooks/usePublish'
import { Button, Popconfirm, message } from 'antd'
export default function TobePublish() {
  const { tableList,setTableList } = usePublish(1)// 1待发布

  // 发布
  const publishNews = async (id) => {
    const res = await $byIdupdateNewsTwoStatus({
      audit_status: 2,
      publish_status: 2,
      id
    });
    if (res.status === 0) {
      message.success('发布成功');
      const res=await $byStatusGetNews(1)
      if(res.status===0){
        setTableList(res.data)
      }
    }
  }
  // 取消发布
  const cancel = () => {
    message.error('取消发布');
  }
  return (
    <>
      <NewsPublish tableList={tableList} button={(id) =>
        <Popconfirm
          title="系统提示"
          description="你确定要发布吗?"
          onConfirm={() => publishNews(id)}
          onCancel={cancel}
          okText="确定"
          cancelText="取消"
        >
          <Button type='primary'>发布</Button>
        </Popconfirm>
      } />
    </>
  )
}
