import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute';
import Login from "@/views/login";
import MyLayout from "@/views/mylayout";
import Home from "@/views/home";
import { lazy, Suspense } from 'react'
const RoleManage = lazy(() => import('@/views/user_manage/role_manage'))
const UserList = lazy(() => import('@/views/user_manage/user_list'))
const AuditNews = lazy(() => import('@/views/audit_manage/audit_news'))
const AuditList = lazy(() => import('@/views/audit_manage/audit_list'))
const ToBePublish = lazy(() => import('@/views/publish_manage/tobe_publish'))
const InsertingWinding = lazy(() => import('@/views/publish_manage/inserting_winding'))
const DidPublish = lazy(() => import('@/views/publish_manage/did_publish'))
const LimitList = lazy(() => import('@/views/permission_manage/limit_list'))
const RoleList = lazy(() => import('@/views/permission_manage/role_list'))
const DraftBox = lazy(() => import('@/views/news_manage/draft_box'))
const WriteNews = lazy(() => import('@/views/news_manage/write_news'))
const NewsCategory = lazy(() => import('@/views/news_manage/news_category'))
const UserInfo = lazy(() => import('@/views/userInfo/UserInfo'))
const NewsPreview = lazy(() => import('@/components/news_preview/NewsPreview'))
const NewsEdit = lazy(() => import('@/views/news_manage/news_edit/NewsEdit'))
const Tourist = lazy(() => import('@/views/tourist/Tourist'))
const Detail = lazy(() => import('@/views/tourist/Detail'))
const Error = lazy(() => import('@/views/404/error'))
export default function index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate to='/login' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<AuthRoute><MyLayout /></AuthRoute>}>
                    <Route path='/' element={<Navigate to='/home' />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/user_manage/role_manage' element={<Suspense fallback={'loading...'}><RoleManage /></Suspense>} />
                    <Route path='/user_manage/user_list' element={<Suspense fallback={'loading...'}><UserList /></Suspense>} />
                    <Route path='/audit_manage/audit_news' element={<Suspense fallback={'loading...'}><AuditNews /></Suspense>} />
                    <Route path='/audit_manage/audit_list' element={<Suspense fallback={'loading...'}><AuditList /></Suspense>} />
                    <Route path='/publish_manage/tobe_publish' element={<Suspense fallback={'loading...'}><ToBePublish /></Suspense>} />
                    <Route path='/publish_manage/inserting_winding' element={<Suspense fallback={'loading...'}><InsertingWinding /></Suspense>} />
                    <Route path='/publish_manage/did_publish' element={<Suspense fallback={'loading...'}><DidPublish /></Suspense>} />
                    <Route path='/permission_manage/limit_list' element={<Suspense fallback={'loading...'}><LimitList /></Suspense>} />
                    <Route path='/permission_manage/role_list' element={<Suspense fallback={'loading...'}><RoleList /></Suspense>} />
                    <Route path='/news_manage/draft_box' element={<Suspense fallback={'loading...'}><DraftBox /></Suspense>} />
                    <Route path='/news_manage/write_news' element={<Suspense fallback={'loading...'}><WriteNews /></Suspense>} />
                    <Route path='/news_manage/news_category' element={<Suspense fallback={'loading...'}><NewsCategory /></Suspense>} />
                    <Route path='/userInfo' element={<Suspense fallback={'loading...'}><UserInfo /></Suspense>} />
                    <Route path='/news_preview/:id' element={<Suspense fallback={'loading...'}> <NewsPreview /></Suspense>} />
                    <Route path='/news_edit/:id' element={<Suspense fallback={'loading...'}><NewsEdit /></Suspense>} />
                </Route>
                <Route path='/tourist' element={<Suspense fallback={'loading...'}><Tourist /></Suspense>} />
                <Route path='/tourist/detail/:id' element={<Suspense fallback={'loading...'}><Detail /></Suspense>} />
                <Route path='*' element={<Suspense fallback={'loading...'}><Error /></Suspense>} />
            </Routes>
        </BrowserRouter>
    )
}

