import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import parse from 'html-react-parser';
import "react-quill/dist/quill.snow.css";
import { BACKEND_ADDRESS } from '../constants/address';

const Postwrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div``

const Title = styled.p`padding: 10px 20px; margin-bottom: 20px; border-bottom: 1px solid #dbdbdb;`
const Content = styled.p`padding: 10px 20px; word-wrap: break-word;`


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
                </Row>
            </Container>
        </Postwrap>
    )
}

export default Post