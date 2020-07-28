import React, { useContext,useEffect } from 'react';

import styled from 'styled-components'
import SimpleSlider from '../src/components/Slider';
import Login from '../src/components/Login/Login';
import { AuthContext } from './_app';
import Router from 'next/router'

export default function Index() {
  const {authData,setauthData} = useContext(AuthContext);
  useEffect(() => {
    // if(authData.user_id){
    //   Router.push('/store/1');
    // }
    window.location.href = 'https://kushal98.github.io/Ordrlo-Website/';
    return () => {
    }
  }, [])

  return <></>;
  // return (
  //     <Block >
  //       {/* <Login /> */}
  //       <SimpleSlider />
  //       <Login />
  //       {/* <Signup/> */}
  //     </Block>
  // );
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