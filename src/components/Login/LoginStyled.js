import styled,{keyframes} from 'styled-components'
import Flex from 'styled-flex-component'
import React from 'react'

export const slideIn = keyframes`

    0%{
        transform : translateX(100%);
    }
    100%{
        transform : translateX(0%);
    }
`

export const SignupContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    min-width: 100vw;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #3c4dae;
    animation : ${slideIn} 0.3s;
`
export const StackHeader = styled.div`
    color:#ffffff;
    padding:1rem;
    svg{
        vertical-align: middle;
        margin: 10px;
    }
`
export const BackButton = styled.div`

`
export const LoginCard = styled.div`
    width: calc(100% - 3rem);
    border-radius: 20px;
    left: 1.5rem;
    padding: 1rem;
    bottom: 1rem;
    margin: auto;
    background: #ffffff;
    margin-top: -4rem;
    z-index: 2;
    position: absolute;
    
    min-height: 300px;
    box-shadow: 1px 1px 1px 2px rgba(0,0,0,0.1);
    &.signupCard{
        top: 50%;
        bottom: auto;
        transform: translateY(-50%);
        margin:0;
    }
    .slick-dots li button:before{
        font-size:1rem;
    }
`
export const TextInputWrapper = styled.div`
width:100%;
display:block;
position:relative;
// margin:1rem 0;
margin-top:1rem;
    img{
     position: absolute;
    right: 0;
    height: auto;
    top: 0.75rem;
    right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    object-fit: contain;
    }
    span{
        color:#3c4dae;
    }
}
`
export const TextInput = styled.input`
    box-shadow:none;
    width:100%;
    border: 1px solid #ccc;
    padding: 0.5rem;
    font-size: 1rem;
    height: 3rem;
    border-radius: 8px;
    outline: none;
    padding-left:1rem;
    
`
export const Separator = styled.div`
    color:#333333;
    text-align:center;
`

export const SolidButton = styled.button`
    border: none;
    border-radius: 10px;
    background: #3c4dae;
    box-shadow: 2px 4px 5px 1px rgba(0,0,0,0.1);
    color: #ffffff;
    font-weight: 700;
    width: 100%;
    padding: 1rem;
    font-size: 1.2rem;
    margin-top:1rem;
    &:disabled{
        opacity:0.8;
    }
`
export const LoginText = styled.div`
    padding-top:0.5rem;
    color:#aaaaaa;
    text-align:center;
    span{
        color:#3c4dae;
    }
`
export const LoginHeader = styled.div`
font-size:1.5rem;
text-align:center;
color:#333333;
font-weight:700;
`

export const Tagline = styled.div`
    color:#999999;
    text-align:center;
`

export const SuccessText = styled.div`
    color:#4CAF50;
    text-align:center;
`

export const ErrorText = styled.div`
    color:red;
    text-align:center;
`
