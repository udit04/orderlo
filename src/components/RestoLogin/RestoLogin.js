import React, { useState } from 'react'
import styled,{keyframes} from 'styled-components'
import Flex from 'styled-flex-component'
//import { BackIcon } from '../../Icons';
import { RestoLoginService } from '../../services/restoLoginService';
import {TextInput,TextInputWrapper,SolidButton,LoginText,LoginHeader,Tagline,SuccessText,ErrorText} from '../Login/LoginStyled';
import RestoSignup from './RestoSignup';
import Router from 'next/router';

export default function Login(){
    const [showSignup ,setSignup ] = useState(false);
    const [err, setErr] = useState(null);
    const [message,setMessage]  = useState('');
    const [pinType, setPinType] = useState('password')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleFormChange =(e)=>{
        if(e.target.name==='username'){
            setUsername(e.target.value);
        }else if(e.target.name==='password' && e.target.value.length<=10){
            setPassword(e.target.value)
        }
    }
    
    const handleSubmit = (e)=>{
        RestoLoginService.loginResto({username,password}).then(res=>{
            if(res.data ){
                if(res.data && res.data.createNewRestaurant){
                    setMessage('');
                    setErr(res.data.message);
                    
                    setTimeout(()=>{
                        setSignup(true);
                    },1000);
                }else{
                    setErr('');
                    setMessage(res.data.message)
                    if(res.data && res.data.restaurant){
                        setMessage(res.data.message);
                        if(res.data.restaurant){
                            localStorage.setItem('restoDetail',JSON.stringify({ restaurant:{...res.data.restaurant}}));
                            Router.push(`/dashboard/${res.data.restaurant.id}`)
                        }
                    }
                }
                
            }else{

            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return (
        <div>
                <LoginPage>
                    { !showSignup
                        && 
                    <LoginWrapper>
                        <LoginHeader>
                            Welcome to Ordrlo
                        </LoginHeader>
                        <Tagline>SignIn</Tagline>
                        {message && message!=='' && <SuccessText>{message}</SuccessText>}
                        {err && err!=='' && <ErrorText>{err}</ErrorText>}
                        <TextInputWrapper>
                            <TextInput  type='text'  placeholder='Username' name='username' onChange={handleFormChange} value={username} />
                            <img src={require('../../../public/static/phone.png')}/>
                        </TextInputWrapper>
                    
                                <TextInputWrapper>
                                    <TextInput id='password' name='password' onChange={handleFormChange} value={password} placeholder='password'  type={pinType}/>
                                    <Flex justifyEnd><span >Forgot password</span></Flex>
                                    <img onClick={()=>setPinType(pinType==='password'?'text':'password')} src={require('../../../public/static/lock.png')}/>
                                </TextInputWrapper>
                                
                                <SolidButton as='button' disabled={!(username.length>0 && password.length>0)} onClick={handleSubmit}>SignIn</SolidButton>
                            
                        <LoginText style={{cursor:'pointer'}}>Don't have an account yet?<br/><span onClick={()=>{setSignup(true)}}>Create an account</span></LoginText>
                    </LoginWrapper>
                    }
                        
                    { showSignup
                        &&
                        <RestoSignup username={username} closeSignup={setSignup}/>}

                    <img src={require('../../../public/static/mockup.jpg')}/>
                </LoginPage>
        </div>
    )
}



export const slideIn = keyframes`

    0%{
        transform : translateX(100%);
    }
    100%{
        transform : translateX(0%);
    }
`

const RestoLoginContainer = styled.div`
    background:#3c4dae;

`
const LoginWrapper = styled.div`
    left: 0;
    right: 0;
    width: 100%;
    top: 0;
    bottom: 0;
    margin: 0;
    padding:1rem;
    padding-top: 10rem;
    border-radius: 0;
    @media screen and (min-width : 960px){
        position:relative;
        max-width: 600px;
        background: #ffff;
        height: calc(100vh - 50px);
        /* margin-top: 50px;
        margin-left: 50px; */
        border-radius: 50px 50px 0 0;
    }
`

const LoginPage = styled.div`
    background:#3c4dae;
    position:relative;
    padding: 50px;
    display:flex;
    justify-content:space-between;
    &> img{
        display:block;
        object-fit:contain;
        margin:1rem;
        max-width:500px;
    }
    @media screen and (max-width : 960px){
        display:block;
        &> img{
        display:none;
        }
    }
`