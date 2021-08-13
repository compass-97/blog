import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_ADDRESS } from '../constants/address';

const Homewrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div``


const Postli = styled.li`position: relative; padding: 5px 10px; border-bottom: 1px solid #dbdbdb;`
const Postlithumb = styled.img`width: 50px; height: 50px;`
const Polistlititle = styled.span`position: absolute; top: 20px; left: 80px;`
const Home = () => {
    const [postlist,setPostlist] = useState([])
    useEffect(()=>{
        axios.get(BACKEND_ADDRESS+`/api/readpostlist`,{withCredentials: true}).then((res)=>{
            setPostlist(postlist.concat(res.data))
        })
    },[])

    return (
        <Homewrap>
            <Container>
                <Row>
                    <ul>
                        {postlist.map(post=><Link to={{pathname:`/post/${post.id}`}} key={post.id}><Postli>
                            <Postlithumb src={post.thumbnail} />
                            <Polistlititle>{post.title}</Polistlititle>
                        </Postli></Link>)}
                    </ul>
                </Row>
            </Container>
        </Homewrap>
    )
}

export default Home;