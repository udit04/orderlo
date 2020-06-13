import React from 'react';

import styled from 'styled-components'
import SimpleSlider from '../src/components/Slider';
import Login from '../src/components/Login';
export default function Index() {
  return (
      <Block >
        {/* <Login /> */}
        <SimpleSlider />
        <Login />
      </Block>
  );
}

const Block = styled.div`
  display:block;
  width:100%;
  height:100%;
  
`