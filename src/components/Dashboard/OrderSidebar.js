import React from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import Router from 'next/router';
function OrderSidebar(props) {
    const {restaurant} = props;
    console.log('ROuter',Router);
    const logout = ()=>{
        localStorage.removeItem('restoDetail');
        window.location.reload();
    }

    return (
        <SidebarContainer>
            {/* Sidebar */}
            <Flex column justifyCenter alignCenter>
                <div>
                    <RestoLogo >{restaurant.image && <img src={restaurant.image}/>}</RestoLogo>
                    <RestoName>{restaurant.name}</RestoName>
                </div>
                <Flex column>
                    
                    <SideOption className={props.activeTab===0?'activeMenuTab':''} onClick={()=>{props.setActiveTab(0)} }>
                    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M3 11h58v42H3z" fill="#e1ecfd"/><path d="M23 26l-1 6H8l-1-6z" fill="#aa7b4f"/><path d="M23 26H7l1-5h14z" fill="#cca174"/><path d="M13 26h4v3h-4z" fill="#f5e0cd"/><path d="M43 17h3v5h-3zM49 16h3v6h-3z" fill="#ffda44"/><path d="M52 17h3v5h-3zM46 18h3v4h-3z" fill="#ff9811"/><path d="M28 40h8v4h-8z" fill="#46f8ff"/><path d="M37 22l-1 10h-8l-1-10z" fill="#5bcbfa"/><path d="M26 19h12v3H26z" fill="#2488ff"/><path d="M35 19h-2v-3a1 1 0 011-1l2-1v2l-1 1z" fill="#5bcbfa"/><path d="M11 40h8v4h-8z" fill="#46f8ff"/><path d="M3 3h58v8H3z" fill="#2488ff"/><path d="M54 32H44l-1-10h12zM6 6h2v2H6z" fill="#ec455a"/><path d="M10 6h2v2h-2z" fill="#ffda44"/><path d="M14 6h2v2h-2z" fill="#91dc5a"/><g fill="#1a6fb0"><path d="M11 35h2v2h-2zM15 35h4v2h-4zM28 35h2v2h-2zM32 35h4v2h-4z"/></g><path d="M57 41v12l-3 4v5H41v-6l-3-4v-8l3-3v-8a2 2 0 012-2 2 2 0 011 0 2 2 0 010 1 2 2 0 011 0 2 2 0 010 1v7a2 2 0 012-2 2 2 0 012 2 2 2 0 012-2 2 2 0 012 2v1a2 2 0 012-2 2 2 0 012 2z" fill="#f09898"/></svg>
                        <div className='optionName'>
                            Orders
                        </div>
                    </SideOption>

                    <SideOption className={props.activeTab===1?'activeMenuTab':''} onClick={()=>Router.push('/createmenu')} >
                        <div className='optionName' style={{fontWeight:'bold'}}>Menu</div>
                    </SideOption>

                    <SideOption className={props.activeTab===1?'activeMenuTab':''} onClick={logout} >
                        <div className='optionName' style={{fontWeight:'bold'}}>Logout</div>
                    </SideOption>
                    {/* <SideOption className={props.activeTab===2?'activeMenuTab':''} onClick={()=>{props.setActiveTab(2)}} >
                        <img src=''/>
                        <div className='optionName'>
                            Reports
                        </div>
                    </SideOption>  */}
                </Flex>
            </Flex>
        </SidebarContainer>
    )
}

export default OrderSidebar

const SidebarContainer = styled.div`
    background:#3c4dae;
    padding:1rem;
    width: 200px;
    min-width:200px;
    padding-top:100px;
    &> div{
        position: sticky;
        top: 100px;
    }
`
const RestoLogo = styled.div`
    height:100px;
    width:100px;
    margin:auto;
    background:#eee;
    img{
        position:relative;
        width:100%;
        height:100%;

    }
`
const RestoName = styled.div`
    font-size:1.25rem;font-weight:800;
    color:#fff;
    padding-top:0.5rem;
    text-align:center;
    margin-bottom:3rem;

`

const SideOptions = styled.div`

`
const SideOption = styled.div`
    margin-bottom:50px;
    position:relative;
    cursor:pointer;
    img{
        max-width: 50px;
        min-height: 50px;
        display: block;
        margin: auto;
        background: #fff;
    }
    .optionName{
        color:#fff;
        font-size:0.8rem;
        text-align:center;
        padding:0.5rem 0
    }
    &.activeMenuTab:before{
        content: '';
        position: absolute;
        display: block;
        height: 50px;
        width: 100px;
        bottom: 40px;
        left: 50px;
        background: #eeeeee;
        background-color: #eeeeee;
        border-right: 0;

    }
    
`
