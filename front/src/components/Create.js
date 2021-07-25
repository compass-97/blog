import React,{useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Createwrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div``

const Inputtitle = styled.input`display: block; width: 100%; box-sizing: border-box; padding: 10px 20px; margin-bottom: 20px; border: none; border-bottom: 1px solid #dbdbdb;`
const Inputcontent = styled.textarea`display: block; width: 100%; min-height: 200px; box-sizing: border-box; padding: 10px 20px; resize: none; border: none;`
const SubmitBtn = styled.button`display: block; width: 200px; height: 50px; font-size: 16px; font-weight: bold; padding: 5px; margin: 0 auto; background: #f4f4f4; border: 2px solid #f4f4f4; border-radius: 10px; transition: all .2s ease; &:hover {background: gray; color: #fff; cursor: pointer;}`

const Create = ({history}) => {
    const [newpost,setNewpost] = useState({
        title:'',
        content:''
    })

    const getvalue = (e) => {
        const {name,value} = e.target
        setNewpost({
            ...newpost,
            [name] : value
        })
    }


    const submit = () => {
        const {title,content} = newpost;
        axios.post(`http://localhost:8000/api/createpost`,{
            title: title,
            content: content
        }).then(()=>{
            alert('등록되었습니다.')
            history.push('/')
        })
    }

    return (
        <Createwrap>
            <Container>
                <Row>
                    <div>
                        <Inputtitle type='text' placeholder='제목을 입력해주세요' name='title' onChange={getvalue}/>
                    </div>
                    <div>
                    <Inputcontent placeholder='본문을 작성해주세요' name='content' onChange={getvalue}></Inputcontent>
                    </div>
                    <div>
                        <SubmitBtn onClick={submit}>글작성</SubmitBtn>
                    </div>
                </Row>
            </Container>
        </Createwrap>
    )
}

export default Create;