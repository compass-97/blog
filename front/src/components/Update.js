import React from 'react';
import styled from 'styled-components';
import Reactquill from '../lib/quill';

const Updatewrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div``




const Update = (props) => {
    return (
        <Updatewrap>
            <Container>
                <Row>
                    {Reactquill(props)}
                </Row>
            </Container>
        </Updatewrap>
    )
}

export default Update;