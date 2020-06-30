import React from 'react'
import styled from 'styled-components'
import { HamburgerIcon, NotifIcon, SearchIcon } from '../Icons'
import  Flex  from 'styled-flex-component';
import ProductSearch from './ProductSearch';

export default function Header(props) {
    const {store} = props;
    return (
        <HeaderWrapper>
            <Flex justifyBetween alignCenter>
    <HeaderTitle>Welcome to {store?store.name:''}</HeaderTitle>
                <div>
                    <NotifIcon height={32} width={32}/>
                    <HamburgerIcon onClick={props.toggleSidebar} height={32} width={32}/>
                </div>
            </Flex>
            <Flex>
                <ProductSearch/>
                
            </Flex>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.header`
    background:#3c4dae;
    padding:1rem;
    padding-top:1.5rem;
    svg{
        margin-left:1rem;
    }
`

const HeaderTitle = styled.div`
    color:#fff;
    font-weight:800;
    font-size:20px;

`