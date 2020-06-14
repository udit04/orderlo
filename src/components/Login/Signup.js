import React, { useState } from 'react'
import {SignupContainer,slideIn,BackButton,StackHeader,LoginCard,TextInput,TextInputWrapper,Separator,SolidButton,LoginText,LoginHeader,Tagline,SuccessText,ErrorText} from './LoginStyled'
import { BackIcon } from '../../Icons';
import Flex from 'styled-flex-component'
import { loginService } from '../../services/loginService';
export default function Signup(props) {
    const {closeSignup} = props;
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setMobileNo] = useState('');
    const [pin, setPin] = useState('');
    const [otp, setOtp] = useState('')
    const [err,setErr] = useState('');
    const [disable, setDisable] = useState(false)
    const [otpSent,setOtpSent] = useState(false);
    const handleSubmit = (event)=>{
        const formData = {
            first_name,
            last_name,
            phone_number,
            email:email,
            pin:pin,
        }
        setOtpSent(true);
    }
    const verifyOtp = ()=>{
        const formData = {
            first_name,
            last_name,
            phone_number,
            email,
            pin,
            otp,
            "role_id": 1,
	        "new_user" : true
        }
        
        loginService.verifyOtpNewUser(formData).then(res=>{
            console.log(res);
        }).catch(err=>{
            setErr(err.response?err.response.data.message:'something went wrong');
            console.log(err);
        })
    }
    const sendOtp = ()=>{
        setOtpSent(false);
        loginService.sendOtp({
            phone_number,
            "new_user" : true
        }).then(res=>{
            if(res.status === 200){
                setOtpSent(true);
            }else{
                setErr(res.data.message);
                setOtpSent(false);
            }
        }).catch(err=>{
            console.log(err);
            setErr('something went wrong');
            setOtpSent(false);
        })
    }
    return (
        <SignupContainer>
            <StackHeader><BackIcon onClick={()=>{closeSignup(false)}} height={16} width={16}/>Already a member ? </StackHeader>
            {
                !otpSent
                    ?
                <LoginCard className='signupCard'> 
                    
                    <LoginHeader>
                        Signup
                    </LoginHeader>
                    {err && err!=='' && <ErrorText>{err}</ErrorText>}
                    <TextInputWrapper>
                        <TextInput placeholder='First Name' name='first_name' onChange={(e)=>{setFirstName(e.target.value)}} value={first_name}  type="text"/>
                        <img src={require('../../../public/static/name.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput id='last_name' name='last_name' placeholder='Last name' onChange={(e)=>{setLastName(e.target.value)}} value={last_name} type="text"/>
                        <img src={require('../../../public/static/name.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput id='email' name='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email}  type="text"/>
                        <img src={require('../../../public/static/email.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput id='phone_number' name='phone_number' placeholder='Mobile' onChange={(e)=>{setMobileNo(e.target.value)}} value={phone_number}  type="text"/>
                        <img src={require('../../../public/static/phone.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput id='pin' name='pin' placeholder='Pin' onChange={(e)=>{setPin(e.target.value)}} value={pin} type="text"/>
                        <img src={require('../../../public/static/lock.png')}/>
                    </TextInputWrapper>

                    <SolidButton disabled={disable} onClick={sendOtp} as='button' >Signup</SolidButton>
                    <LoginText>Already have an account<br/><span onClick={()=>{closeSignup(false)}}>Login</span></LoginText>
                </LoginCard>
                :
                <LoginCard className='signupCard'> 
                    <LoginHeader>
                        Signup
                    </LoginHeader>
                    <TextInputWrapper>
                        <TextInput id='otp' name='otp' placeholder='OTP' onChange={(e)=>{setOtp(e.target.value)}} value={otp} type="text"/>
                        <img src={require('../../../public/static/lock.png')}/>
                <Flex justifyBetween><span >&nbsp;Resend Otp</span><span>1:30 &nbsp;</span></Flex>
                    </TextInputWrapper>
                    <SolidButton onClick={verifyOtp} as='button' type='submit'>Signup</SolidButton>
                </LoginCard>
            }
        </SignupContainer>
    )
}