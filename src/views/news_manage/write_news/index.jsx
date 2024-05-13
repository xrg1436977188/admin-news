import React, { useEffect, useState } from 'react'
import { Steps, Button, Form, Input, Select, message } from 'antd';
import { PageHeader } from '@ant-design/pro-components';
import { $getCategoryList, $createNews } from '@/api/news'
import './index.scss'
import { useSelector } from 'react-redux'
import NewsEditor from '@/components/NewsEditor'
const { Option } = Select;
export default function WriteNews() {
  const { name, identity} = useSelector(state => state.user.userInfo)
  const [current, setCurrent] = useState(0);
  const [category, setCategory] = useState([]);
  const [newsForm] = Form.useForm()
  const [formData, setFormData] = useState([])
  const [editorData, setEditorData] = useState('')
  // 编写新闻下一步操作
  const handleNext = () => {
    if (current === 0) {
      newsForm.validateFields().then(values => {
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
  // 上一步操作
  const handlePrev = () => {
    setCurrent(current - 1);
  }
  const selectChange = (value) => {
    console.log(value);
  }
  // 编写新闻提交
  const handleSave = async (num) => {
    const res = await $createNews({
      ...formData,
      content: editorData,
      identity,
      name,
      audit_status: num,
      publish_status: num,
    })
    if (res.status === 0) {
      if (num === 0) {
        message.success('文章已经保存至草稿箱啦！')

      } else {
        message.success('文章已经提交到审核列表,请耐心等待审核哦！')
      }

    }
  }
  useEffect(() => {
    const getCategoryList = async () => {
      const res = await $getCategoryList()
      setCategory(res.data)
    }
    getCategoryList()
  }, [])
  return (
    <>
      <PageHeader style={{ marginBottom: 100 }} title='撰写新闻' />
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
          form={newsForm}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600, margin: '50px auto' }}
          initialValues={{ remember: true }}
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
        <NewsEditor getCurrentContent={(editValue) => {
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
