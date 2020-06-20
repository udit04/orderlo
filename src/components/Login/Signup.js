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
    const [phone_number, setMobileNo] = useState(props.mobile_number);
    const [pin, setPin] = useState('');
    const [otp, setOtp] = useState('')
    const [err,setErr] = useState('');
    const [otpMessage,setOtpMessage] = useState('');
    const [disable, setDisable] = useState(false)
    const [otpSent,setOtpSent] = useState(false);
    const {authData,setauthData} = useContext(AuthContext);
    const [pinType, setPinType] = useState('password')
    const handleSubmit = (event)=>{

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
                window && window.localStorage.setItem('userData',JSON.stringify(res.data.user));
                Router.push('/store/1');
            }else{
                setOtpMessage('')
                setErr(res.data.message);
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
            loginService.sendOtp({
                phone_number,
                "new_user" : true
            }).then(res=>{
                if(res.status === 200){
                     setOtpMessage('Otp sent successfully')
                    setOtpSent(true);
                   
                }else{
                    setOtpMessage('')
                    setErr(res.data.message);
                    setOtpSent(false);
                }
            }).catch(err=>{
                console.log(err);
                setOtpMessage('')

                setErr('something went wrong');
                setOtpSent(false);
            })
        }else{
            setErr('Enter all details correctly');
            setOtpSent(false);
            // setOtpMessage('')
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
                        <TextInput required id='phone_number' name='phone_number'  placeholder='Mobile' onChange={(e)=>{setMobileNo(e.target.value.length<=10?e.target.value:phone_number)}} value={phone_number}  type="text"/>
                        <img src={require('../../../public/static/phone.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput required id='pin' name='pin' placeholder='Pin'  type={pinType} onChange={(e)=>{setPin(e.target.value.length<=10?e.target.value:pin)}} value={pin} />
                        <img onClick={()=>setPinType(pinType==='password'?'text':'password')} src={require('../../../public/static/lock.png')}/>
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