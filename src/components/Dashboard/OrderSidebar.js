import React from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'

function OrderSidebar(props) {
    return (
        <SidebarContainer>
            {/* Sidebar */}
            <Flex column justifyCenter alignCenter>
                <div>
                    <RestoLogo></RestoLogo>
                    <RestoName>The Red Cafe</RestoName>
                </div>
                <Flex column>
                    
                    <SideOption className={props.activeTab===0?'activeMenuTab':''} onClick={()=>{props.setActiveTab(0)} }>
                        <img src=''/>
                        <div className='optionName'>
                            Orders
                        </div>
                    </SideOption>
                    <SideOption className={props.activeTab===1?'activeMenuTab':''} onClick={()=>{props.setActiveTab(1)}} >
                        <img src=''/>
                        <div className='optionName'>
                            Menu
                        </div>
                    </SideOption>
                    <SideOption className={props.activeTab===2?'activeMenuTab':''} onClick={()=>{props.setActiveTab(2)}} >
                        <img src=''/>
                        <div className='optionName'>
                            Reports
                        </div>
                    </SideOption> 
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
        height: 40px;
        width: 100%;
        bottom: 40px;
        left: 77px;
        background: #eeeeee;
        /* border: 1px solid #f1a62d; */
        background-color: #eeeeee;
        border-right: 0;

    }
    
`
