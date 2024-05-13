import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw ,EditorState,ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './NewsEditor.scss'
export default function NewsEditor(props) {
    const [editorState, setEditorState] = useState()//初始化编辑器
    // 转化
    useEffect(()=>{
        const html = props.editorData;
        if(html===undefined){
            return;
        }
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks, contentBlock.entityMap);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        }

    },[props.editorData])
    return (
        <>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState) => { setEditorState(editorState) }}
                onBlur={()=>{props.getCurrentContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));}}
            />
        </>
    )
}
