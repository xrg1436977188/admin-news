import React from 'react'
import NewsPublish from '@/components/NewsPublish'
import usePublish from '@/hooks/usePublish'
import { Button, Popconfirm, message } from 'antd'
import { $byIdupdateNewsTwoStatus, $byStatusGetNews } from '@/api/news'
export default function DidPublish() {
  const { tableList,setTableList } = usePublish(2)// 2代表已发布


  // 下线
  const goLive = async (id) => {
    const res = await $byIdupdateNewsTwoStatus({
      audit_status: 0,
      publish_status: 3,
      id
    })
    if (res.status === 0) {
      message.success('下线成功')
      const res=await $byStatusGetNews(2)
      if(res.status===0){
        setTableList(res.data)
      }
    }
  }
  // 取消下线
  const cancel = () => {
    message.error('取消下线')
  }
  return (
    <>
      <NewsPublish
        tableList={tableList}
        button={(id) =>
          <Popconfirm
            title="系统提示"
            description="你确定要下线吗?"
            onConfirm={() => goLive(id)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type='primary'>下线</Button>
          </Popconfirm>
        } />
    </>
  )
}
