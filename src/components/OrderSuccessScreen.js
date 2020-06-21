import React from 'react'
import {OrderSuccess} from '../Icons'
import  styled  from 'styled-components';
export default function OrderSuccessScreen(props) {
    return (
        <div
        style={{    
            transform: 'translate(-50%,-50%)',
            position: 'absolute',
            left: '50%',
            top:'50%',
            maxWidth: '300px'
            }} 
        >
            <OrderSuccess 
            height='100%' width="100%"/>
            <OrderSuccessMessage>Order Placed successfully</OrderSuccessMessage>
            <GoToMenuBtn onClick={props.goToMenu}>Go To menu</GoToMenuBtn>
        </div>
    )
}

const GoToMenuBtn = styled.div`
    padding:1rem;
    border-radius:5px;
    margin:1rem 0 ;
    background:#f1a62d;
    color:#ffffff;
    text-align:center;
    font-weight:bold;
`
const OrderSuccessMessage = styled.div`
    text-align: center;
    font-size: 1.25rem;
`
