import React from 'react';
import styled from 'styled-components';
import Reactquill from '../lib/quill';

const Createwrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div``


const Create = (props) => {
    return (
        <Createwrap>
            <Container>
                <Row>
                    {Reactquill(props)}
                </Row>
            </Container>
        </Createwrap>
    )
}

export default Create;