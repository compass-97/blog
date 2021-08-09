import React, {useRef,useEffect,useState,useMemo} from "react";
import styled from "styled-components";
import axios from 'axios';
import ReactQuill, {Quill} from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { BACKEND_ADDRESS } from "../constants/address";
import ImageResize from '@looop/quill-image-resize-module-react';
Quill.register('modules/ImageResize', ImageResize)


const Inputtitle = styled.input`display: block; width: 100%; box-sizing: border-box; padding: 10px 20px; margin-bottom: 20px; border: none; border-bottom: 1px solid #dbdbdb;`
const ReactQuilldiv = styled.div`height: 700px;`
const Submitbtndiv = styled.div`margin-bottom: 100px;`
const SubmitBtn = styled.button`display: block; width: 200px; height: 50px; font-size: 16px; font-weight: bold; padding: 5px; margin: 0 auto; background: #f4f4f4; border: 2px solid #f4f4f4; border-radius: 10px; transition: all .2s ease; &:hover {background: gray; color: #fff; cursor: pointer;}`

const Thumbnailwrap = styled.div`margin-bottom: 30px;`
const Thumbnailcontainer = styled.div`margin-bottom: 10px;`
const Thumbnail = styled.img`width: 200px; height: 200px; `
const InputThumbnaillabel = styled.label`padding: 5px 15px; margin-top: 20px; margin-left: 40px; cursor: pointer; color: gray; border: 1px solid gray; border-radius: 3px;`
const InputThumbnail = styled.input`position: absolute; left: -99999px;`


const EditorComponent = (props) => {
    const type = props.match.params.id
    const QuillRef = useRef();

    const [title,setTitle] = useState('')
    const [contents,setContents] = useState('');
    const [thumbnail,setThumbnail] = useState('');

    useEffect(()=>{
        if(type) {
            axios.get(BACKEND_ADDRESS+`/api/readpost/${type}`).then((res)=>{
                const title = res.data[0].title
                const content = res.data[0].content
                setTitle(title)
                setContents(content)
            })
        } else {
            console.log('create mode')
        }
    },[])

    const gettitle = e => {
        setTitle(e.target.value)
    }

    const submit = () => {
        if(type) {
            axios.put(BACKEND_ADDRESS+`/api/updatepost/${type}`,{
                title: title,
                content: contents,
                thumbnailurl: thumbnail
            }).then(()=>{
                alert('수정되었습니다')
                props.history.push(`/post/${type}`)
            })
        } else {
            axios.post(BACKEND_ADDRESS+`/api/createpost`,{
                title: title,
                content: contents,
                thumbnailurl: thumbnail
            }).then(()=>{
                alert('등록되었습니다.')
                props.history.push('/')
            })
        }
    }
    

    const imageHandler = () => {
        const input = document.createElement('input')
        input.setAttribute('type','file');
        input.setAttribute('accept','image/*')
        input.click()

        input.onchange = () => {
            const file = input.files[0]
            const fd = new FormData();
            fd.append('thumbnail',file);
            axios.post(BACKEND_ADDRESS+`/api/thumbnail`,fd,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res)=>{
                const location = res.data
                const range = QuillRef.current.getEditor().getSelection().index;
                const quill = QuillRef.current.getEditor()
                quill.setSelection(range,1);
                quill.clipboard.dangerouslyPasteHTML(
                    range,
                    `<img src='${location}' alt='업로드한이미지입니다' />`
                )
            })
        }
    }

    const thumbnailhandler = e => {
        const thumbnailfile = e.target.files[0]
        const thumbnailfd = new FormData();
        thumbnailfd.append('thumbnail',thumbnailfile)
        axios.post(BACKEND_ADDRESS+`/api/thumbnail`,thumbnailfd,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            setThumbnail(res.data)
        })
    }


    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    ['bold','italic','underline','strike','blockquote'],
                    [{size: ['small',false,'large','huge']},{color: []}],
                    [
                        {list: 'ordered'},
                        {list: 'bullet'},
                        {indent: '-1'},
                        {indent: '+1'},
                        {align: []},
                    ],
                    ['image','video'],
                ],
                handlers: {
                    image: imageHandler,
                }
            },
            ImageResize : {
                modules : ['Resize']
            }
        }),
        []
    )



    
    return (
        <>
        <Thumbnailwrap>
            <Thumbnailcontainer id='thumbnailcontainer'>
                <Thumbnail src={thumbnail} />
            </Thumbnailcontainer>
            <InputThumbnaillabel htmlFor='thumbnailid'>썸네일업로드</InputThumbnaillabel>
            <InputThumbnail type='file' accept='image/*' onChange={thumbnailhandler} id='thumbnailid' />
        </Thumbnailwrap>
        <div>
            <Inputtitle type='text'  placeholder='제목을 입력해주세요' value={title} onChange={gettitle} />
        </div>
        <ReactQuilldiv>
        <ReactQuill
            style={{height:'600px',overflow:'visible'}}
            ref={(element) => {
                if(element !== null) {
                    QuillRef.current = element;
                }
            }}
            value={contents}
            onChange={setContents}
            modules={modules}
            theme='snow'
            placeholder='내용을 입력해주세요'
        />
        </ReactQuilldiv>
        <Submitbtndiv>
            <SubmitBtn onClick={submit}>글작성</SubmitBtn>
        </Submitbtndiv>
        </>
    )
}

export default EditorComponent;