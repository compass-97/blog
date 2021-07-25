import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Updatewrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div``


const Updatetitle = styled.input`display: block; width: 100%; box-sizing: border-box; padding: 10px 20px; margin-bottom: 20px; border: none; border-bottom: 1px solid #dbdbdb;`
const Updatecontent = styled.textarea`display: block; width: 100%; min-height: 200px; box-sizing: border-box; padding: 10px 20px; resize: none; border: none;`
const SubmitBtn = styled.button`display: block; width: 200px; height: 50px; font-size: 16px; font-weight: bold; padding: 5px; margin: 0 auto; background: #f4f4f4; border: 2px solid #f4f4f4; border-radius: 10px; transition: all .2s ease; &:hover {background: gray; color: #fff; cursor: pointer;}`



const Update = ({match,history}) => {
    const id = match.params.id
    const [post,setPost] = useState({
        title:'',
        content:''
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/readpost/${id}`).then((res)=>{
            const title = res.data[0].title
            const content = res.data[0].content
            setPost({
                ...post,
                title: title,
                content: content
            })
        })
    },[])

    const getvalue = (e) => {
        const {name,value} = e.target
        setPost({
            ...post,
            [name] : value
        })
    }

    const submit = () => {
        axios.put(`http://localhost:8000/api/updatepost/${id}`,{
            title: post.title,
            content: post.content
        }).then(()=>{
            alert('수정되었습니다')
            history.push(`/post/${id}`)
        })
    }
    return (
        <Updatewrap>
            <Container>
                <Row>
                    <div>
                        <Updatetitle type='text' name='title' value={post.title} onChange={getvalue} />
                    </div>
                    <div>
                        <Updatecontent name='content' value={post.content} onChange={getvalue} />
                    </div>
                    <div>
                        <SubmitBtn onClick={submit}>수정하기</SubmitBtn>
                    </div>
                </Row>
            </Container>
        </Updatewrap>
    )
}

export default Update;