import React from 'react'
import NewsPublish from '@/components/NewsPublish'
import usePublish from '@/hooks/usePublish'
import { Button, Popconfirm, message } from 'antd'
import { $byIdupdateNewsTwoStatus, $deleteDraftBoxList ,$byStatusGetNews } from '@/api/news'
export default function InsertingWinding() {
  const { tableList,setTableList } = usePublish(3)// 3是下线

  // 恢复上线
  const reBackgolive = async (id) => {
    const res = await $byIdupdateNewsTwoStatus({
      audit_status:2,
      publish_status:2,
      id
    })
    if (res.status === 0) {
      message.success('恢复上线成功')
      const res=await $byStatusGetNews(3)
      if(res.status===0){
        setTableList(res.data)
      }
      
    }
  }
  // 删除
  const deleteNews = async (id) => {
    const res = $deleteDraftBoxList(id)
    if (res.status === 0) {
      message.success('删除成功')
      await $byStatusGetNews(3)
    }
  }
  // 取消
  const cancel = () => {
    message.error('取消操作')
  }
  return (
    <>
      <NewsPublish tableList={tableList} button={(id) =>
        <>
          <Popconfirm
            title="系统提示"
            description="你确定要恢复上线吗?"
            onConfirm={() => reBackgolive(id)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button style={{ marginRight: 10 }} type='primary'>恢复上线</Button>
          </Popconfirm>
          <Popconfirm
            title="系统提示"
            description="你确定要删除吗?"
            onConfirm={() => deleteNews(id)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </>
      } />
    </>
  )
}
