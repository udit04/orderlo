import React, { useState, useEffect,useContext } from 'react'
import styled,{keyframes} from 'styled-components'
import Flex from 'styled-flex-component'
import { BackIcon } from '../../Icons';
import { loginService } from '../../services/loginService';
import {SignupContainer,BackButton,StackHeader,LoginCard,TextInput,TextInputWrapper,Separator,SolidButton,LoginText,LoginHeader,Tagline,SuccessText,ErrorText} from './LoginStyled';
import Signup from './Signup';
import { AuthContext } from '../../../pages/_app';
import Router from 'next/router';

export default function Login(){
    const [showSignup ,setSignup ] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [mobile_number,setMobileNumber] = useState('');
    const [otp, setOtp] = useState('')
    const [err, setErr] = useState(null);
    const [otpMessage,setOtpMessage]  = useState('');
    const [disable,setDisable] = useState(true);
    const [pin, setPin] = useState('')
    const {authData,setauthData} = useContext(AuthContext);
    const [otpSent, setotpSent] = useState(false)
    const [pinType, setPinType] = useState('password')
    const sendOtp = ()=>{
        if(!(mobile_number.length===10 && mobile_number.match(/^[0-9]+$/) != null)){
            setErr('Enter correct Phone number');
        }else{
            loginService.sendOtp({
                "phone_number" : mobile_number,
                "new_user": false
            }).then(res=>{
                if(res.status===200){
                    if(res.data.createNewUser){
                        setErr(res.data.message+ '! You need to register first' );
                        setOtpMessage('');
                        setTimeout(()=>{
                                setSignup(true);
                        },1000)
                    }else{
                        setOtpMessage('Otp sent successfully!');
                        setDisable(false);
                        setErr('')
                        setotpSent(true);
                    }
                    
                    
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
        
           
    }
    const handleFormChange =(e)=>{
        if(e.target.name==='phone_number' && e.target.value.length <=10){
            setMobileNumber(e.target.value);
        }else if(e.target.name==='otp' && e.target.value.length<=6){
            setOtp(e.target.value);
        }else if(e.target.name==='pin' && e.target.value.length<=6){
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
                    setauthData({
                        userData:res.data.user
                    })
                   window && window.localStorage.setItem('userData',JSON.stringify(res.data.user));
                    Router.push('/store');
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
                        <TextInput  type='number' disbaled={otpSent}  placeholder='Email/Mobile number' name='phone_number' onChange={handleFormChange} value={mobile_number} />
                        <img src={require('../../../public/static/phone.png')}/>
                    </TextInputWrapper>
                   {    otpSent
                            ?
                        <>
                            <TextInputWrapper>
                            <TextInput type='number' id='otp' name='otp' placeholder='OTP' onChange={handleFormChange} value={otp}/>
                            <Flex justifyEnd><span onClick={sendOtp}>Resend Otp</span></Flex>
                            <img src={require('../../../public/static/lock.png')}/>
                            </TextInputWrapper>
                            <Separator>Or</Separator>
                            <TextInputWrapper>
                                <TextInput id='pin' name='pin' onChange={handleFormChange} value={pin} placeholder='6 digit pin'  type={pinType}/>
                                <Flex justifyEnd><span >Forgot password</span></Flex>
                                <img onClick={()=>setPinType(pinType==='password'?'text':'password')} src={require('../../../public/static/lock.png')}/>
                            </TextInputWrapper>
                            
                            <SolidButton as='button' disabled={disable} onClick={handleSubmit}>Login</SolidButton>
                        </>
                        :
                         <SolidButton as='button' onClick={sendOtp}>Continue</SolidButton>
                   }
                    <LoginText>Don't have an account yet?<br/><span onClick={()=>{setSignup(true)}}>Create an account</span></LoginText>
                </LoginCard>
                    
           { showSignup
              &&
            <Signup mobile_number={mobile_number} closeSignup={setSignup}/>}
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
