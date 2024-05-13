
import React, { useEffect, useState, useRef, useContext } from 'react'
import { Table, Button, Popconfirm, message, Form, Input, Drawer } from 'antd';
import { $getCategoryList, $updateNewsCategory, $deleteNewsCategory, $addNewsCategory } from '@/api/news'
export default function NewsCategory() {
  const inputRef = useRef(null)
  const EditableContext = React.createContext(null);
  const [open, setOpen] = useState(false);
  const [tableList, setTableList] = useState([])
  // const publish_status_list = ['未发布', '待发布', '已上线', '已下线']
  // const audit_status_list = ['未审核', '审核中', '审核通过', '拒绝审核']
  // const status_color_list = ['black', 'orange', 'green', 'red']
  // 取消删除
  const deleteCancel = () => {
    message.error('删除取消')
  }
  // 确认删除
  const deleteSubmit = async (id) => {
    const res = await $deleteNewsCategory(id)
    if (res.status === 0) {
      message.success('删除成功')
      getCategoryList()
    }
  }
  // 编辑表格数据 --修改保存
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '分类名称',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'value',
        title: '分类名称',
        handleSave: handleSave,
      }),
    },
    {
      title: '操作',
      key: 'action',
      render: (data) => (
        <Popconfirm
          title="系统提示"
          description="你确定要删除吗?"
          onConfirm={() => deleteSubmit(data.id)}
          onCancel={deleteCancel}
          okText="确定"
          cancelText="取消"
        >
          <Button style={{ marginRight: 20 }} danger>删除</Button>
        </Popconfirm>
      ),
      align: 'center',
    },

  ]
  const handleSave = async (row) => {
    const res = await $updateNewsCategory(row)
    if (res.status === 0) {
      message.success('修改成功')
      getCategoryList()
    }
  }
  const getCategoryList = async () => {
    const res = await $getCategoryList()
    setTableList(res.data)
  }
  useEffect(() => {
    getCategoryList()
  }, [])
  const save = async () => {
    let title = inputRef.current.input.value
    await $addNewsCategory(title).then(res => {
      if (res.status === 0) {
        message.success('新闻分类添加成功')
        inputRef.current.input.value=''
        setOpen(false);
        setTableList([...tableList, res.data])
        getCategoryList()
      }else{
        message.error('新闻分类已经存在')
        return
      }
    })
  }
  return (
    <div>
      <Button type='primary' style={{ marginBottom: '10px' }} onClick={() => setOpen(true)}>添加分类</Button>
      <Drawer destroyOnClose={true} title="添加新闻分类" onClose={() => setOpen(false)} open={open}>
        <Input ref={inputRef} placeholder="新闻分类" />
        <Button type='primary' style={{ marginTop: '10px' }} onClick={save}>添加</Button>

      </Drawer>
      <Table
      pagination={{pageSize:'10'}}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          }
        }}
        rowKey={'id'}
        bordered size='small'
        dataSource={tableList}
        columns={columns} />
    </div >
  )
}
