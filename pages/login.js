import React, { useContext,useEffect } from 'react';
import styled from 'styled-components'
import SimpleSlider from '../src/components/Slider';
import Login from '../src/components/Login/Login';
import { AuthContext } from './_app';
import Router from 'next/router'
import Head from 'next/head'

export default function LoginPage() {
  const {authData,setauthData} = useContext(AuthContext);
  useEffect(() => {
    if(authData && authData.user_id){
      Router.push('/checkout');
    }
    return () => {
    }
  }, [])

  return (
      <Block >
          <Head >
            <title>Ordrlo | Login</title>
          </Head>
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