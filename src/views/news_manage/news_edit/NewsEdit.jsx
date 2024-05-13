import React, { useEffect, useState } from 'react'
import { Steps, Button, Form, Input, Select, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '@ant-design/pro-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { $getCategoryList, $getNewsDetail, $updateNews } from '@/api/news'
import './NewsEdit.scss'
import NewsEditor from '@/components/NewsEditor'
import { useSelector } from 'react-redux';
const { Option } = Select;
export default function NewsEdit() {
  const { id } = useParams()    // 获取新闻id
  const [current, setCurrent] = useState(0);// 步骤条-当前步骤
  const [category, setCategory] = useState([]);// 新闻分类
  const [newsEditForm] = Form.useForm()// 表单实例
  const [formData, setFormData] = useState([])// 表单数据
  const [editorData, setEditorData] = useState('')// 编辑器数据
  const { identity, name } = useSelector(state => state.user.userInfo)
  const navigate = useNavigate()


  // 下一步
  const handleNext = () => {
    if (current === 0) {
      newsEditForm.validateFields().then(values => {
        setFormData(values)
        setCurrent(current + 1);
      }).catch(error => {
        console.log(error);

      })
    } else {
      if (editorData === '' || editorData.trim() === '<p><p/>') {
        message.error('新闻内容不能为空')
      } else {
        setCurrent(current + 1);
      }
    }
  }
  // 上一步
  const handlePrev = () => {
    setCurrent(current - 1);
  }

  const selectChange = (value) => {
    console.log(value);
  }
  // 保存
  const handleSave = async (num) => {
    const res = await $updateNews({
      ...formData,
      id,
      identity,
      author: name,
      content: editorData,
      audit_status: num,
    })
    if (res.status === 0) {
      if (num === 0) {
        message.success('文章已经保存至草稿箱啦！')

      } else {
        message.success('文章已经提交到审核列表,请耐心等待审核哦！')
      }

    }
  }
  // 新闻分类
  useEffect(() => {
    const getCategoryList = async () => {
      const res = await $getCategoryList()
      setCategory(res.data)
    }
    getCategoryList()
  }, [])
  // 新闻详情
  useEffect(() => {
    const getNewsList = async () => {
      const res = await $getNewsDetail(id)
      if (res.status === 0) {
        const { title, category, content } = res.data[0]
        newsEditForm.setFieldsValue({
          title,
          category
        })
        setEditorData(content)
      }
    }
    getNewsList()
  }, [id])
  return (
    <>
      <PageHeader
        backIcon={<ArrowLeftOutlined style={{ fontSize: '30px' }} />}
        style={{ marginBottom: 100 }}
        title='更新新闻'
        onBack={() => window.history.back()} />

      <Steps style={{ width: 1100, margin: '0 auto' }} current={current} items={[
        {
          title: '基本信息',
          description: '新闻标题-新闻分类',
        },
        {
          title: '新闻内容',
          description: "新闻主题内容",
        },
        {
          title: '新闻提交',
          description: '保存草稿-提交审核',
        },
      ]}
      />
      <div className={current === 0 ? 'show' : 'hide'}>
        <Form
          form={newsEditForm}
          name="newsEditForm"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600, margin: '50px auto' }}
          autoComplete="off">
          <Form.Item
            label="文章标题"
            name="title"
            rules={[{ required: true, message: '文章标题不能为空' }]}>
            <Input size='large' placeholder='请输入文章标题' />
          </Form.Item>

          <Form.Item
            name="category"
            label="新闻分类"
            rules={[
              {
                required: true,
                message: '新闻分类不能为空'
              },
            ]}
          >
            <Select
              placeholder="请选择文章分类"
              onChange={selectChange}
              allowClear
              size='large'
            >
              {category.map(item => <Option value={item.value} key={item.id}>{item.value}</Option>)}
            </Select>
          </Form.Item>

        </Form>
      </div>
      <div className={current === 1 ? 'show' : 'hide'}>
        <NewsEditor editorData={editorData} getCurrentContent={(editValue) => {
          setEditorData(editValue)
        }} />
      </div>
      <div className={current === 2 ? 'show' : 'hide'}>
      </div>
      <div style={{ margin: '50px auto', width: 900, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {current < 2 && <Button type='primary' style={{ margin: '30px ' }} onClick={handleNext}>下一步</Button>}
        {current > 0 && <Button style={{ margin: '30px ' }} onClick={handlePrev}>上一步</Button>}
        {current === 2 && <span>
          <Button type='primary' style={{ marginRight: 30 }} onClick={() => { handleSave(0) }}>保存至草稿箱</Button>
          <Button type='primary' danger onClick={() => { handleSave(1) }}>提交审核</Button>
        </span>}
      </div>

    </>
  )
}
