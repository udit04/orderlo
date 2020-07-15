import React from 'react'
import styled  from 'styled-components'

function StyledModal(props) {
    return (
        <ModalWrapper >
            {props.children}
        </ModalWrapper>
    )
}

const ModalWrapper = styled.div`
    position:fixed;
    z-index:2000;
    top:0;
    left:0;
    right:0;
    bottom:0%;
    background:rgba(0,0,0,0.5);
    display:flex;
    justify-content:center;
    align-items:center;
`
export default StyledModal
