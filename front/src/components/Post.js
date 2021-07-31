import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import parse from 'html-react-parser';
import { BACKEND_ADDRESS } from '../constants.js/address';

const Postwrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div``

const Title = styled.p`padding: 10px 20px; margin-bottom: 20px; border-bottom: 1px solid #dbdbdb;`
const Content = styled.p`padding: 10px 20px; word-wrap: break-word;`

const Btndiv = styled.div`text-align: center; margin-top: 100px;`
const Custombtn = styled.button`padding: 15px 25px; margin: 10px; border-radius: 10px; border: none; font-size: 18px; font-weight: bold; background: gray; color: #fff; &:hover {cursor:pointer; background: black;}`

const Post = ({match,history}) => {
    const id = match.params.id
    const [post,setPost] = useState({
        title:'',
        content:''
    })
    useEffect(()=>{
        axios.get(BACKEND_ADDRESS+`/api/readpost/${id}`).then((res)=>{
            const title = res.data[0].title
            const content = res.data[0].content
            setPost({
                ...post,
                title: title,
                content: content
            })
        })
    },[])
    const movetoupdate = () => {
        history.push(`/update/${id}`)
    }
    const deletepost = () => {
        if(window.confirm('삭제하시겠습니까?')){
            axios.delete(BACKEND_ADDRESS+`/api/deletepost/${id}`).then(()=>{
                alert('삭제되었습니다')
                history.push('/')
            })
        } else {
            alert('취소되었습니다')
        }
    }
    
    return(
        <Postwrap>
            <Container>
                <Row>
                    <div>
                        <Title>{post.title}</Title>
                    </div>
                    <div>
                        <Content>{parse(post.content)}</Content>
                    </div>
                    <Btndiv>
                        <Custombtn onClick={movetoupdate}>수정하기</Custombtn>
                        <Custombtn onClick={deletepost}>삭제하기</Custombtn>
                    </Btndiv>
                </Row>
            </Container>
        </Postwrap>
    )
}

export default Post