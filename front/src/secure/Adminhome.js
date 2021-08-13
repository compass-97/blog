import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BACKEND_ADDRESS } from '../constants/address';

const Adminhomewrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div``

const Adminbtn = styled.button`border: 1px solid #dbdbdb; font-weight: bold; border-radius: 10px; background: #dbdbdb; padding: 10px 20px; margin: 10px; cursor: pointer;`

const Postli = styled.li`position: relative; padding: 5px 10px; border-bottom: 1px solid #dbdbdb;`
const Postlithumb = styled.img`width: 50px; height: 50px;`
const Polistlititle = styled.span`position: absolute; top: 20px; left: 80px;`
const Libtndiv = styled.div`display: inline-block; float:right; padding-top: 15px; `
const Libtn = styled.button`padding: 5px; margin: 0 5px; border: 1px solid #dbdbdb; border-radius: 10px; background: none; cursor: pointer;`


const Adminhome = (props) => {
    const [postlist,setPostlist] = useState([])

    useEffect(()=>{
        axios({
            method:'get',
            withCredentials: true,
            url: BACKEND_ADDRESS+`/api/secure/auth`
        }).then((res)=>{
            if(res.data==='isauth'){
                axios({
                    method: 'get',
                    withCredentials: true,
                    url : BACKEND_ADDRESS + `/api/secure/readpostlist`
                }).then((res)=>{
                    setPostlist(postlist.concat(res.data))
                })
            } else {
                props.history.push(`/alsemdj`)
            }
        })
    },[])

    const logout = () => {
        axios({
            method: 'get',
            withCredentials: true,
            url: BACKEND_ADDRESS + `/api/secure/logout`
        }).then((res)=>{
            console.log(res)
            props.history.push('/')
        })
    }
    return (
        <>
        <Adminhomewrap>
            <Container>
                <Row>
                    <div>
                    <Adminbtn onClick={()=>props.history.push('/alsemdj/create')}>글쓰기</Adminbtn>
                    <Adminbtn onClick={logout}>로그아웃</Adminbtn>
                    </div>
                    <ul>
                    {postlist.map(post=>
                        <Postli key={post.id}>
                            <Postlithumb src={post.thumbnail} />
                            <Polistlititle>{post.title}</Polistlititle>
                            <Libtndiv>
                                <Libtn onClick={()=>props.history.push(`/post/${post.id}`)}>본문</Libtn>
                                <Libtn onClick={()=>props.history.push(`/alsemdj/update/${post.id}`)}>수정</Libtn>
                                <Libtn onClick={()=>{
                                    if(window.confirm('삭제하시겠습니까?')){
                                        axios.delete(BACKEND_ADDRESS+`/api/secure/deletepost/${post.id}`).then(()=>{alert('삭제되었습니다.')})
                                    } else {
                                        alert('취소되었습니다')
                                    }
                                }}>삭제</Libtn>
                            </Libtndiv>
                        </Postli>)}
                    </ul>
                </Row>
            </Container>
        </Adminhomewrap>
        </>
    )
}

export default Adminhome;