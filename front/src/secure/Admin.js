import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BACKEND_ADDRESS } from '../constants/address';

const Adminwrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div`padding: 0 400px;`

const Loginwrap = styled.div`margin-top: 200px;  padding: 20px; border-radius: 15px; background: #dbdbdb;`
const Loginid = styled.input`padding: 10px 20px; background: #fff; border: none; margin-bottom: 3px; display: block; box-sizing: border-box; width: 100%;`
const Loginpwd = styled.input`padding: 10px 20px; background: #fff; border: none; margin-bottom: 3px; display: block; box-sizing: border-box; width: 100%;`
const Loginbtn = styled.button`cursor: pointer; color: #fff; font-weight: bold; font-size: 16px; padding: 5px 10px 0 10px; background: none; border: none; display: block; box-sizing: border-box; width: 100%;`

const Admin = (props) => {
    const [admin,setAdmin] = useState({
        id: '',
        password: ''
    })

    const getvalue = e => {
        const {name,value} = e.target
        setAdmin({
            ...admin,
            [name] : value
        })
    }

    useEffect(()=>{
        axios({
            method:'get',
            withCredentials: true,
            url: BACKEND_ADDRESS+`/api/secure/auth`
        }).then((res)=>{
            if(res.data==='isauth'){
                props.history.push('/alsemdj/home')
            } else {
                console.log('loginpage')
            }
        })
    },[])

    const login = () => {
        axios({
            method: 'post',
            data: admin,
            withCredentials: true,
            url: BACKEND_ADDRESS+`/api/secure/login`
        }).then((res)=>{
            console.log(res)
            if(res) {
                props.history.push('/alsemdj/home')
            } else {
                console.log('fail')
            }
        })
    }

    return (
        <>
        <Adminwrap>
            <Container>
                <Row>
                    <Loginwrap>
                        <Loginid type='text' name='id' onChange={getvalue}/>
                        <Loginpwd type='password' name='password' onChange={getvalue} />
                        <Loginbtn onClick={login} >로그인</Loginbtn>
                    </Loginwrap>
                </Row>
            </Container>
        </Adminwrap>
        </>
    )
}

export default Admin;