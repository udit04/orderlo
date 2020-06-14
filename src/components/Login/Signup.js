import React, { useState,useContext,useEffect } from 'react'
import {SignupContainer,slideIn,BackButton,StackHeader,LoginCard,TextInput,TextInputWrapper,Separator,SolidButton,LoginText,LoginHeader,Tagline,SuccessText,ErrorText} from './LoginStyled'
import { BackIcon } from '../../Icons';
import Flex from 'styled-flex-component'
import { loginService } from '../../services/loginService';
import { AuthContext } from '../../../pages/_app';
import  Router  from 'next/router';
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
    const {authData,setauthData} = useContext(AuthContext);
    const {otpMessage,setOtpMessage} = useState('');
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
    useEffect(() => {
        document.getElementsByTagName('body')[0].style='height:100vh;overflow-y:hidden;';
        return () => {
            document.getElementsByTagName('body')[0].style='height:100%;overflow-y:auto;';
        }
    }, [])
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
            if(res.data.user){
                setOtpMessage('signup successful')
                setauthData({userData:res.data.user})
                Router.push('/store');
            }
        }).catch(err=>{
            setErr(err.response?err.response.data.message:'something went wrong');
            console.log(err);
        })
    }
    const handleFormChange = ()=>{

    }
    const sendOtp = (e)=>{
        e.preventDefault();
        if(first_name.length>0 && last_name.length>0 && phone_number.length===10 && pin.length>0 && email.length>0){
            setOtpSent(false);
            loginService.sendOtp({
                phone_number,
                "new_user" : true
            }).then(res=>{
                if(res.status === 200){
                    setOtpSent(true);
                    setOtpMessage('Otp sent successfully')
                }else{
                    setErr(res.data.message);
                    setOtpSent(false);
                    setOtpMessage('')
                }
            }).catch(err=>{
                console.log(err);
                setErr('something went wrong');
                setOtpSent(false);
                setOtpMessage('')
            })
        }else{
            setErr('Enter all details correctly');
            setOtpSent(false);
            setOtpMessage('')
        }
       
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
                    {otpMessage && otpMessage!=='' && <SuccessText>{otpMessage}</SuccessText>}
                    <form onSubmit={sendOtp}>
                    <TextInputWrapper>
                        <TextInput required placeholder='First Name' type='text' name='first_name' onChange={(e)=>{setFirstName(e.target.value)}} value={first_name}  type="text"/>
                        <img src={require('../../../public/static/name.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper >
                        <TextInput required id='last_name' name='last_name' type='text' placeholder='Last name' onChange={(e)=>{setLastName(e.target.value)}} value={last_name} type="text"/>
                        <img src={require('../../../public/static/name.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput required id='email' required type='email' name='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email}  type="text"/>
                        <img src={require('../../../public/static/email.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput required id='phone_number' name='phone_number' type='text' placeholder='Mobile' onChange={(e)=>{setMobileNo(e.target.value)}} value={phone_number}  type="text"/>
                        <img src={require('../../../public/static/phone.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput required id='pin' name='pin' placeholder='Pin' type='text' onChange={(e)=>{setPin(e.target.value)}} value={pin} type="text"/>
                        <img src={require('../../../public/static/lock.png')}/>
                    </TextInputWrapper>

                    <SolidButton disabled={disable} type='submit' as='button' >Signup</SolidButton>
                    </form>
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
                <Flex justifyBetween><span onClick={sendOtp}>&nbsp;Resend Otp</span><span>1:30 &nbsp;</span></Flex>
                    </TextInputWrapper>
                    <SolidButton onClick={verifyOtp} as='button' type='submit'>Signup</SolidButton>
                </LoginCard>
            }
        </SignupContainer>
    )
}