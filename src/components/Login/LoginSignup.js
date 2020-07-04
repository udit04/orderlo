import React, { useContext,useEffect } from 'react';

import styled from 'styled-components'
import SimpleSlider from '../Slider';
import Login from './Login';
import { AuthContext } from './_app';
import Router from 'next/router'

export default function LoginSignup(props) {
  const {authData,setauthData} = useContext(AuthContext);
  useEffect(() => {
    if(authData.user_id){
    //   Router.push('/store/1');
    }
    return () => {
    }
  }, [])
  useEffect(() => {
    if(userContext.authData && userContext.authData.user_id){
      props.setLoginPopup(false);
      props.placeOrderClick();
    }
  }, [userContext.authData && userContext.authData.user_id])
  return (
      <Block >
        {/* <Login /> */}
        <SimpleSlider />
        <Login />
        {/* <Signup/> */}
      </Block>
  );
}

const Block = styled.div`
  display:block;
  width:100%;
  height:100%;
  max-width:1020px;
  min-height: 100vh;
  position:relative;
  overflow-x: hidden;
`