import React, { useEffect, useState } from 'react';
import { $getRoleUserInfo, $updateSelfUserInfo, $bindAccount} from '@/api/role';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    message,
    Form,
    Input,
    Select,
    Upload,
} from 'antd';
import { useNavigate, } from 'react-router-dom';
import { useSelector} from 'react-redux';
import './index.scss'

const { TextArea } = Input;
export default function UserInfo() {
    const { id, account, image_url } = useSelector(state => state.user.userInfo)
    const [userInfoForm] = Form.useForm();//实例
    const [userInfo, setUserInfo] = useState([])//用户
    const [loading, setLoading] = useState(false);//头像上传加载loading
    const [imageUrl, setImageUrl] = useState();//头像
    //-----------------------------------------------------
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    // 上传之前处理函数
    const beforeUpload = (file) => {
        console.log(file);
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('你只能上传JPG/PNG类型的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    // 上传图片过程中处理函数
    const handleChange = async (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                console.log(url);
                setLoading(false);
                setImageUrl(url);
            });
            // console.log(info.file.response);
            let infos = {
                onlyId: info.file.response.onlyId,
                account,
                url: info.file.response.url
            }
            const res = await $bindAccount(infos)
            if (res.status === 0) {
                message.success('图片上传成功')
                setImageUrl(image_url)


            }

        }
    };
    // 上传按钮
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
// 返回 
    const navigate = useNavigate();
    const callBack = () => {
        navigate(-1)
    }
    // 获取用户信息
    const getRoleUserInfo = async () => {
        const res = await $getRoleUserInfo(id)
        if (res.status === 0) {
            setUserInfo(res.data)
            userInfoForm.setFieldsValue({
                id: res.data[0].id,
                account: res.data[0].account,
                name: res.data[0].name,
                sex: res.data[0].sex,
                identity: res.data[0].identity,
                intro: res.data[0].intro,
                email:res.data[0].email,
            })

        }
    }

    // 提交表单
    const onFinish = async (values) => {
        const res = await $updateSelfUserInfo(values)
        if (res.status === 0) {
            message.success('修改成功')
            await getRoleUserInfo()
        }
    }
    useEffect(() => {
        getRoleUserInfo()

    }, [])
    return (
        <>
            <Upload
                name="image_url"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://127.0.0.1:3000/role/uploadAvatar"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                maxCount={1}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>

            <Form
                form={userInfoForm}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
            >
                <Form.Item label="ID" name='id' rules={[

                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="账号" name='account'>
                    <Input />
                </Form.Item>
                <Form.Item label="姓名" name='name' rules={[
                    {
                        required: true,
                        message: '请输入姓名',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="性别" name='sex' rules={[
                    {
                        required: true,
                        message: '请输入性别',
                    },
                ]}>
                    <Select>
                        <Select.Option value="男">男</Select.Option>
                        <Select.Option value="女">女</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="身份" name='identity' rules={[
                    {
                        required: true,
                        message: '请输入身份',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="邮箱" name='email'>
                    <Input />
                </Form.Item>
                <Form.Item label="个人简介" name='intro' rules={[
                    {
                        required: true,
                        message: '请输入个人简介',
                    },
                ]}>
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item style={{display:'flex',justifyContent:'center'}}>
                    <Button htmlType='submit' type='primary'>保存</Button>
                    <Button style={{marginTop:10}} onClick={callBack}>返回</Button>
                </Form.Item>

            </Form>


        </>
    )
}
