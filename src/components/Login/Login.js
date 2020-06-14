import React, { useState, useEffect } from 'react'
import styled,{keyframes} from 'styled-components'
import Flex from 'styled-flex-component'
import { BackIcon } from '../../Icons';
import { loginService } from '../../services/loginService';
import {SignupContainer,BackButton,StackHeader,LoginCard,TextInput,TextInputWrapper,Separator,SolidButton,LoginText,LoginHeader,Tagline,SuccessText,ErrorText} from './LoginStyled';
import Signup from './Signup';

export default function Login(){
    const [showSignup ,setSignup ] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [mobile_number,setMobileNumber] = useState('');
    const [otp, setOtp] = useState('')
    const [err, setErr] = useState(null);
    const [otpMessage,setOtpMessage]  = useState('');
    const [disable,setDisable] = useState(true);
    const [pin, setPin] = useState('')
    const sendOtp = ()=>{
        console.log();
        loginService.sendOtp({
                "phone_number" : mobile_number,
                "new_user": false
            }).then(res=>{
                if(res.status===200){
                    setOtpMessage('Otp sent successfully!');
                    setDisable(false);
                    setErr('')
                }else{
                    setOtpMessage('');
                    setErr(res.data.message)
                    setDisable(true);
                }
                console.log(res);
            }).catch(err=>{
                console.log(err);
                setOtpMessage('');
                setErr('some error occured')
                setDisable(false);
            })
           
    }
    const handleFormChange =(e)=>{
        if(e.target.name==='mobile_number'){
            setMobileNumber(e.target.value);
        }else if(e.target.name==='otp'){
            setOtp(e.target.value);
        }else if(e.target.name==='pin'){
            setPin(e.target.value);
        }
    }
    const verifyOtp = ()=>{
        loginService.verifyOtpOldUser({
            pin:pin,
            otp:otp,
            "role_id": 1,
            phone_number:mobile_number
        }).then(res=>{
            if(res.status === 200){
                if(res.data && res.data.user && res.data.user.user_id){
                    setErr('');
                    setOtpMessage(res.data.message);
                }else{
                    setErr(res.data.message)
                    setOtpMessage('');
                }
            }else{
                setErr(res.data.message);
                setOtpMessage('');
            }
        }).catch(err=>{
            console.log(err);
            setErr('some error occured');
            setOtpMessage('');
            if(err.response && err.response.data.message){
                setErr(err.response.data.message);
            }
        })
    }
    const handleSubmit = (e)=>{
        verifyOtp();
    }
    return (
        <div>
                <LoginCard>
                    <LoginHeader>
                        Welcome to Ordrlo
                    </LoginHeader>
                    <Tagline>tagline</Tagline>
                    {otpMessage && otpMessage!=='' && <SuccessText>{otpMessage}</SuccessText>}
                    {err && err!=='' && <ErrorText>{err}</ErrorText>}
                    <TextInputWrapper>
                        <TextInput placeholder='Email/Mobile number' name='mobile_number' onChange={handleFormChange} value={mobile_number} type="text"/>
                        <img src={require('../../../public/static/email.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput id='otp' name='otp' placeholder='OTP' onChange={handleFormChange} value={otp} type="text"/>
                        <Flex justifyEnd><span onClick={sendOtp}>Generate Otp</span></Flex>
                        <img src={require('../../../public/static/lock.png')}/>
                    </TextInputWrapper>
                    <Separator>Or</Separator>
                    <TextInputWrapper>
                        <TextInput id='pin' name='pin' onChange={handleFormChange} value={pin} placeholder='6 digit pin'  type="text"/>
                        <Flex justifyEnd><span >Forgot password</span></Flex>
                        <img src={require('../../../public/static/lock.png')}/>
                    </TextInputWrapper>
                    
                    <SolidButton as='button' disabled={disable} onClick={handleSubmit}>Login</SolidButton>
                    <LoginText>Don't have an account yet?<br/><span onClick={()=>{setSignup(true)}}>Create an account</span></LoginText>
                </LoginCard>
                    
           { showSignup
              &&
            <Signup closeSignup={setSignup}/>}
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