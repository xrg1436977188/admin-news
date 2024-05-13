import { useEffect, useState } from "react";
import { $byStatusGetNews } from "@/api/news";
const usePublish=(type)=>{
    const [tableList,setTableList]=useState()
    useEffect(()=>{
        const getTableList=async()=>{
            const res=await $byStatusGetNews(type)
            if(res.status===0){
                setTableList(res.data)
            }
        }
        getTableList()
    },[type])
    return{
        tableList,setTableList
    }
}
// tabel数据封装
export default usePublish;