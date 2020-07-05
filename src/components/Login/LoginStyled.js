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
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    min-width: 100vw;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    background: #3c4dae;
    background-size: 100%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MTAgODIzIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48cGF0aCBmaWxsPSIjNkQ4M0RCIiBkPSJNMCAwaDQxMHY4MjNIMHoiLz48cGF0aCBmaWxsPSIjNkQ4M0RCIiBkPSJNMCAwaDQxMXY0MzVIMHoiLz48cGF0aCBkPSJNMSAxaDQwOXYzOTJMMjA0IDUxMyAxIDM5M1YxeiIgZmlsbD0iIzNDNERBRSIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDQxMHY4MjNIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=);
    background-repeat: no-repeat;
    animation : ${slideIn} 0.3s;
`
export const StackHeader = styled.div`
    color:#ffffff;
    padding:0.5rem;
    background: #3c4bab;
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
    min-height: 250px;
    box-shadow: 1px 1px 1px 2px rgba(0,0,0,0.1);
    left:50%;
    transform: translateX(-50%);
    max-width:500px;
    top: 50%;
    bottom: auto;
    &.signupCard{
        top: 55%;
        bottom: auto;
        left:50%;
        transform: translate(-50%,-50%);
        margin:0;
        max-width:500px;
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
    &:focus{
        border:1px solid #3c4dae;
    }
    @media screen and (min-width : 960px){
        /* font-size: 1.8rem;
        padding: 1em;
        margin-bottom: 1.5rem; */
    }
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
