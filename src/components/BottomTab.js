import React from 'react'
import styled from 'styled-components'
import { CartIcon, AccountIcon } from '../Icons'
export default function BottomTab() {

    return (
        <TabContainer>
            <TabButton>
                <AccountIcon height={20} width={20} />
            </TabButton>
            <TabButton>
                <AccountIcon height={20} width={20} />
            </TabButton>
            <TabButton>
                <CartIcon height={20} width={20}/>
            </TabButton>
        </TabContainer>
    )
}

const TabButton = styled.div`
    background: #7689f5;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    padding: 10px;
`;
const TabContainer = styled.div`
    display:flex;
    justify-content:space-evenly;
    position:fixed;
    width:80%;
    bottom:0;
    left:50%;
    transform:translateX(-50%);
    z-index:1000;
    background:#3e4daf;
    border-radius: 10px 10px 0 0 ;
    padding:0.5rem;
`
