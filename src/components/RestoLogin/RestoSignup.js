import React, { useState,useContext,useEffect } from 'react'
import {SignupContainer,slideIn,BackButton,StackHeader,LoginCard,TextInput,TextInputWrapper,Separator,SolidButton,LoginText,LoginHeader,Tagline,SuccessText,ErrorText} from '../Login/LoginStyled'
//import { BackIcon } from '../../Icons';
import  Router  from 'next/router';
import { RestoLoginService } from '../../services/restoLoginService';
export default function RestoSignup(props) {
    const {closeSignup} = props;
    const [restoName, setRestoName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [err,setErr] = useState(null);
    const [pinType, setPinType] = useState('password')
    useEffect(() => {
        document.getElementsByTagName('body')[0].style='height:100vh;overflow-y:hidden;';
        return () => {
            document.getElementsByTagName('body')[0].style='height:100%;overflow-y:auto;';
        }
        
    }, [])
    const signupResto = (e)=>{
        e.preventDefault()
        const formData = {
            username,
            email,
            password,
            name:restoName,
            phone_number
        }        
        RestoLoginService.signupResto(formData).then(res=>{
            if(res.data){
                if(res.data.restaurant){
                    localStorage.setItem('restoDetail',JSON.stringify({ restaurant:{...res.data.restaurant}}));
                    Router.push(`/dashboard/${res.data.restaurant.id}`)
                }
            }else{
                
            }
        }).catch(err=>{
            setErr(err.response && err.response.data ? err.response.data.message:'something went wrong');
        })
    }

    return (
        <SignupContainer>
            {/* <StackHeader><BackIcon onClick={()=>{closeSignup(false)}} height={16} width={16}/>Already a member ? </StackHeader> */}
          
                <LoginCard className='signupCard'> 
                    
                    <LoginHeader>
                        Signup
                    </LoginHeader>
                    {err && <ErrorText>{err}</ErrorText>}
                    {<SuccessText></SuccessText>}
                    <form onSubmit={signupResto}>
                    <TextInputWrapper>
                        <TextInput required placeholder='Restaurant' type='text' name='name' onChange={(e)=>{setRestoName(e.target.value)}} value={restoName}  type="text"/>
                        <img src={require('../../../public/static/name.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper >
                        <TextInput required id='username' name='Username' type='text' placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text"/>
                        <img src={require('../../../public/static/name.png')}/>
                    </TextInputWrapper>
                    <TextInputWrapper>
                        <TextInput required id='email' required type='email' name='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email}  type="text"/>
                        <img src={require('../../../public/static/email.png')}/>
                    </TextInputWrapper>
                    {/* <TextInputWrapper>
                        <TextInput required id='phone_number' name='phone_number'  placeholder='Mobile' onChange={(e)=>{setMobileNo(e.target.value.length<=10?e.target.value:phone_number)}} value={phone_number}  type="text"/>
                        <img src={require('../../../public/static/phone.png')}/>
                    </TextInputWrapper> */}
                    <TextInputWrapper>
                        <TextInput required id='password' name='password' placeholder='password'  type={pinType} onChange={(e)=>{setPassword(e.target.value.length<=10?e.target.value:password)}} value={password} />
                        <img onClick={()=>setPinType(pinType==='password'?'text':'password')} src={require('../../../public/static/lock.png')}/>
                    </TextInputWrapper>

                    <TextInputWrapper>
                        <TextInput required id='phone_number' name='phone_number' placeholder='Mobile Number' type='number' min='1000000000' max="9999999999" onInput={(e)=>e.target.setCustomValidity('')} onInvalid={(e)=>e.target.setCustomValidity('Please Enter valid mobile number')} onChange={(e)=>{setPhoneNumber(e.target.value)}} value={phone_number} />
                        <img src={require('../../../public/static/phone.png')}/>
                    </TextInputWrapper>

                    <SolidButton type='submit' as='button' >Signup</SolidButton>
                    </form>
                    <LoginText>Already have an account<br/><span onClick={()=>{closeSignup(false)}}>Signin</span></LoginText>
                </LoginCard>
              
        </SignupContainer>
    )
}