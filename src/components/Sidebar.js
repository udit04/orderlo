import React,{useContext, useEffect} from 'react'
import  Flex  from 'styled-flex-component';
import styled from 'styled-components'
import { AuthContext } from '../../pages/_app';
import Router from 'next/router';
export default function Sidebar() {
    const data = useContext(AuthContext);
    console.log(data,"____");
    useEffect(() => {
        if(!JSON.parse(window.localStorage.getItem('userData')) ){
           data.setauthData(JSON.parse(window.localStorage.getItem('userData')));
        }
        return () => {
            
        }
    }, [data.authData && data.authData.user_id])
    const logout = ()=>{
        Router.push('/logout');
        // window.localStorage.setItem('userData',null);
        // data.setauthData(null);
        
    }
    if(!data.authData){
        return null
    }else return (
        <SidebarContainer>
            <SidebarTitle>ORDRLO</SidebarTitle>
            <OptionsWrapper>
                <Flex column justifyCenter>
                    <div>
    <Option>{`${data.authData.first_name} ${data.authData.last_name}`}</Option>
                    <Option>Order History</Option>
                    <Option>Terms & Conditions</Option>
                    <Option>Feedback</Option>
                    <Option>Contact us</Option>
                    <Option onClick={logout}>Logout</Option>
                    </div>
                </Flex>
            </OptionsWrapper>
        </SidebarContainer>
    )
}


const SidebarTitle = styled.h1`
    color:#fff;
    position:absolute;
    top:20px;
    text-align:center;
    width: 100%;
`
const OptionsWrapper = styled.div`
    min-width:250px;
    background:#3e4daf;
    height:100%;
   &>div{
      height: 100%;
   }
`
const Option = styled.div`
    color:#fff;
    font-size:1rem;
    font-weight:700;
    padding:0.8rem 1rem;
    text-align:right;
    text-transform:capitalize;
`
const SidebarContainer = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    left: 0;
    background:#3e4daf;


`