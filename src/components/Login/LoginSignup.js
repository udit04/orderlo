import React, { useContext,useEffect } from 'react';

import styled from 'styled-components'
import SimpleSlider from '../Slider';
import Login from './Login';
import Router from 'next/router'
import { AuthContext } from '../../../pages/_app';

export default function LoginSignup(props) {
  const userContext = useContext(AuthContext);
  const authData = userContext.authData;
  useEffect(() => {
    if(authData && authData.userData.user_id){
    //   Router.push('/store/1');
    }
    return () => {
    }
  }, [])
  useEffect(() => {
    if(authData && authData.userData && authData.userData.user_id){
      
      props.placeOrderClick();
      props.setLoginPopup(false);
    }
  }, [authData && authData.userData && authData.userData.user_id])
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
  position:fixed;
  max-width:1020px;
  bottom:0;
  left:0%;
  right:0;
  top:0;
  min-height: 100vh;
  overflow-x: hidden;
  background:#ffffff;
  z-index:200;
`