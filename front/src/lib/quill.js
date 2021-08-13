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


const Submitdiv = styled.div`margin-bottom: 100px; text-align: center;`
const Findiv = styled.div`display: inline-block;`
const Finlabel = styled.label`background: #f4f4f4; margin-right: 10px; cursor: pointer; padding: 5px 10px; border-radius: 10px; transition: all .2s ease; &:hover {background: gray; color: #fff;}`
const Fininput = styled.input`display: none; &:checked + ${Finlabel} {background: gray; color: #fff;} `
const SubmitBtn = styled.button`display: inline-block; width: 200px; height: 50px; font-size: 16px; font-weight: bold; padding: 5px; margin: 0 auto; background: #f4f4f4; border: 2px solid #f4f4f4; border-radius: 10px; transition: all .2s ease; &:hover {background: gray; color: #fff; cursor: pointer;}`

const Topwrap = styled.div`margin-bottom: 30px; display: flex;`
const Thumbnailwrap = styled.div``
const Thumbnailcontainer = styled.div`margin-bottom: 10px;`
const Thumbnail = styled.img`width: 200px; height: 200px; `
const InputThumbnaillabel = styled.label`padding: 5px 15px; margin-top: 20px; margin-left: 40px; cursor: pointer; color: gray; border: 1px solid gray; border-radius: 3px;`
const InputThumbnail = styled.input`position: absolute; left: -99999px;`
const Privatewrap = styled.div`margin-left: 50px;`
const Privatepost = styled.ul`width: 500px; padding: 5px 10px; border: 1px solid #dbdbdb;`
const Privatepostli = styled.li`padding: 10px 10px 0px 0px; border-bottom: 1px solid #dbdbdb; cursor: pointer;`

const EditorComponent = (props) => {
    const type = props.match.params.id
    const QuillRef = useRef();

    const [title,setTitle] = useState('')
    const [contents,setContents] = useState('');
    const [thumbnail,setThumbnail] = useState('');
    const [fin,setFin] = useState('');
    const [priv,setPriv] = useState([]);

    useEffect(()=>{
        axios({
            method: 'get',
            withCredentials: true,
            url: BACKEND_ADDRESS + `/api/secure/auth`
        }).then((res)=>{
            if(res.data!=='isauth'){
                props.history.push('/alsemdj')
            } else if(type) {
                axios.get(BACKEND_ADDRESS+`/api/readpost/${type}`).then((res)=>{
                    const title = res.data[0].title
                    const content = res.data[0].content
                    setTitle(title)
                    setContents(content)
                })
            } else {
                axios.get(BACKEND_ADDRESS+`/api/secure/getpriv`).then((res)=>{
                    setPriv(priv.concat(res.data))
                })
            }
        }) 
    },[])

    const gettitle = e => {
        setTitle(e.target.value)
    }

    const submit = () => {
        if(!fin) {
            alert('글완성되었나요')
        }
        else if(type) {
            axios.put(BACKEND_ADDRESS+`/api/secure/updatepost/${type}`,{
                title: title,
                content: contents,
                thumbnailurl: thumbnail,
                fin: fin
            }).then(()=>{
                alert('수정되었습니다')
                props.history.push(`/alsemdj/home`)
            })
        } else {
            axios.post(BACKEND_ADDRESS+`/api/secure/createpost`,{
                title: title,
                content: contents,
                thumbnailurl: thumbnail,
                fin: fin
            }).then(()=>{
                alert('등록되었습니다.')
                props.history.push('/alsemdj/home')
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
            axios.post(BACKEND_ADDRESS+`/api/s3/thumbnail`,fd,{
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

    const radiohandler = e => {
        setFin(e.target.id)
    }

    const thumbnailhandler = e => {
        const thumbnailfile = e.target.files[0]
        const thumbnailfd = new FormData();
        thumbnailfd.append('thumbnail',thumbnailfile)
        axios.post(BACKEND_ADDRESS+`/api/s3/thumbnail`,thumbnailfd,{
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
        <Topwrap>
            <Thumbnailwrap>
                <Thumbnailcontainer id='thumbnailcontainer'>
                    <Thumbnail src={thumbnail} />
                </Thumbnailcontainer>
                <InputThumbnaillabel htmlFor='thumbnailid'>썸네일업로드</InputThumbnaillabel>
                <InputThumbnail type='file' accept='image/*' onChange={thumbnailhandler} id='thumbnailid' />
            </Thumbnailwrap>
            <Privatewrap>
                {type?
                    null:
                    <Privatepost>
                        <p>임시저장글</p>
                        {priv.map((item)=><Privatepostli key={item.id} onClick={()=>props.history.push(`/update/${item.id}`)}>{item.title}</Privatepostli>)}
                    </Privatepost>
                }
            </Privatewrap>
        </Topwrap>
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
        <Submitdiv>
            <Findiv>
                <Fininput type='radio' name='fin' id='open' onChange={radiohandler} />
                <Finlabel htmlFor='open'>공개</Finlabel>
                <Fininput type='radio' name='fin' id='priv' onChange={radiohandler} />
                <Finlabel htmlFor='priv'>비공개</Finlabel>
            </Findiv>
            <SubmitBtn onClick={submit}>글작성</SubmitBtn>
        </Submitdiv>
        </>
    )
}

export default EditorComponent;