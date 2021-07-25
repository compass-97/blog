import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Homewrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div``

const Postli = styled.li`padding: 5px 10px; border-bottom: 1px solid #dbdbdb;`

const Home = () => {
    const [postlist,setPostlist] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/readpostlist`).then((res)=>{
            setPostlist(postlist.concat(res.data))
        })
    },[])

    return (
        <Homewrap>
            <Container>
                <Row>
                    <ul>
                        {postlist.map(post=><Link to={{pathname:`/post/${post.id}`}} key={post.id}><Postli>{post.title}</Postli></Link>)}
                    </ul>
                </Row>
            </Container>
        </Homewrap>
    )
}

export default Home;