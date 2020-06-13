import React, { useState, useEffect } from 'react'
import styled,{keyframes} from 'styled-components'
import Flex from 'styled-flex-component'
import { BackIcon } from '../Icons';
import { loginService } from '../services/loginService';
function Login() {
    const [showSignup ,setSignup ] = useState(false);
    return (
        <div>
            <LoginCard>
                <LoginHeader>
                    Welcome to Ordrlo
                </LoginHeader>
                <Tagline>tagline</Tagline>
                <TextInputWrapper>
                    <TextInput placeholder='Email/Mobile number'  type="text"/>
                    <img src={require('../../public/static/email.png')}/>
                </TextInputWrapper>
                <TextInputWrapper>
                    <TextInput id='otp' name='otp' placeholder='OTP'  type="text"/>
                    <Flex justifyEnd><label htmlFor='otp'>Generate Otp</label></Flex>
                    <img src={require('../../public/static/lock.png')}/>
                </TextInputWrapper>
                <Separator>Or</Separator>
                <TextInputWrapper>
                    <TextInput id='pin' name='pin' placeholder='6 digit pin'  type="text"/>
                    <Flex justifyEnd><label htmlFor='pin'>Forgot password</label></Flex>
                    <img src={require('../../public/static/lock.png')}/>
                </TextInputWrapper>
                
                <SolidButton>Login</SolidButton>
                <LoginText>Don't have an account yet?<br/><span onClick={()=>{setSignup(true)}}>Create an account</span></LoginText>
            </LoginCard>
           { showSignup
              &&
            <Signup closeSignup={setSignup}/>}
        </div>
    )
}

export default Login;


function Signup(props) {
    const {closeSignup} = props;
    useEffect(() => {
        loginService.sendOtp({
            "phone_number" : "8800947960",
	        "new_user": true
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
        return () => {
            
        }
    }, [])
    return (
        <SignupContainer>
            <StackHeader><BackIcon onClick={()=>{closeSignup(false)}} height={16} width={16}/>Already a member ? </StackHeader>
            <LoginCard className='signupCard'> 
                    <LoginHeader>
                        Signup
                    </LoginHeader>
                    {/* <Tagline>tagline</Tagline> */}
                    <TextInputWrapper>
                        <TextInput placeholder='First name'  type="text"/>
                        <img src={require('../../public/static/name.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput id='otp' name='otp' placeholder='lastname'  type="text"/>
                        <img src={require('../../public/static/name.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput id='pin' name='pin' placeholder='Email'  type="text"/>
                        <img src={require('../../public/static/email.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput id='pin' name='pin' placeholder='mobile'  type="text"/>
                        <img src={require('../../public/static/phone.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput id='pin' name='pin' placeholder='pin'  type="text"/>
                        <img src={require('../../public/static/lock.png')}/>
                    </TextInputWrapper>
                    {/* <TextInputWrapper>
                        <TextInput  type="text"/>
                    </TextInputWrapper> */}
                    <SolidButton>Signup</SolidButton>
                    <LoginText>Already have an account<br/><span>Login</span></LoginText>
            </LoginCard>
        </SignupContainer>
    )
}
const slideIn = keyframes`

    0%{
        transform : translateX(100%);
    }
    100%{
        transform : translateX(0%);
    }
`
const SignupContainer = styled.div`
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
const StackHeader = styled.div`
    color:#ffffff;
    padding:1rem;
    svg{
        vertical-align: middle;
        margin: 10px;
    }
`
const BackButton = styled.div`

`
const LoginCard = styled.div`
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
const TextInputWrapper = styled.div`
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
    label{
        color:#3c4dae;
    }
}
`
const TextInput = styled.input`
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
const Separator = styled.div`
    color:#333333;
    text-align:center;
`

const SolidButton = styled.button`
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
`
const LoginText = styled.div`
    padding-top:0.5rem;
    color:#aaaaaa;
    text-align:center;
    span{
        color:#3c4dae;
    }
`
const LoginHeader = styled.div`
font-size:1.5rem;
text-align:center;
color:#333333;
font-weight:700;
`

const Tagline = styled.div`
    color:#999999;
    text-align:center;
`

