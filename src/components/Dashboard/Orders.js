import React,{ useEffect, useState} from 'react'
import styled from 'styled-components'
import Flex,{FlexItem} from 'styled-flex-component'
import RestoService from '../../services/RestoService'
function Orders(props) {
    const [err, setErr] = useState(null)
    const [ordersData,setOrdersData] = useState(null);
    const [orderTab,setOrderTab] = useState(0)
    useEffect(() => {

        RestoService.getOrders({id:props.id}).then(res=>{
            console.log(res)
            if(res.status === 200 && res.data.menu){
                console.log(res)
                setOrdersData(res.data);
                props.setOrderDetail(res.data.menu[0]);
            }else{
                setErr(err);
            }
        }).catch(err=>{
            setErr(err);
            console.log(err)
        })

        return () => {
            
        }
    }, [])
    
    return (
        <OrdersWrapper>
            <div className="title">Orders</div>
            <OrderTabs>
                <OrderTab onClick={()=>{setOrderTab(0)}} className={orderTab===0?'active':''}>Pending orders</OrderTab>
                <OrderTab onClick={()=>{setOrderTab(1)}} className={orderTab===1?'active':''}>Completed orders</OrderTab>
                <OrderTab>Order history</OrderTab>
            </OrderTabs>

            {   ordersData && ordersData.menu && ordersData.menu.length>0
                &&
                <OrdersListWrapper>
                    <OrdersCount>Today <span>{ordersData.menu.length}</span></OrdersCount>
                    { orderTab ===0 && 
                    ordersData.menu.filter(data=>data.order_status==="accepted").map(data=>{
                        return(
                            <Order setOrderDetail={props.setOrderDetail} data={data}/>
                        )
                    })}
                    { orderTab === 1 && 
                    ordersData.menu.filter(data=>data.order_status!=="accepted").map(data=>{
                        return(
                            <Order setOrderDetail={props.setOrderDetail} data={data}/>
                        )
                    })}
                    {/* <Order/>
                    <Order/>
                    <Order/>
                    <Order/> */}
                </OrdersListWrapper>
            }
        </OrdersWrapper>
    )
}

export default Orders

function Order(props){
    const {data } = props;
    const acceptOrder = ()=>{
        RestoService.acceptOrder(
            {
                "restaurant_id" : data.restaurant_id,
                "order_id" : data.id,
                "order_status" : "accepted"
            }
        ).then(res=>{
            if(res.status===200){
                
            }
        })
    }
    return (
        <OrderWrapper onClick={()=>{props.setOrderDetail(data)}}>
            <Flex>
                <Flex column className='orderColumn'>
                        <OrderNum>
                            <Flex column>
                                <div className='orderNumber'>24</div>
    <div className="time">{new Date(data.createdAt).toLocaleTimeString()}</div>
                            </Flex>
                            
                        </OrderNum>
                </Flex>
                <Flex column  className='orderColumn'>
                    <FieldName>Order number</FieldName>
    <FieldValue>{data.id}</FieldValue>
                </Flex>
                <FlexItem grow="1">
                    <Flex column  className='orderColumn' justifyCenter alignCenter>
                        {/* <FieldName>Total</FieldName>
                        <FieldValue>Rs. 342</FieldValue> */}
                        <ConfirmButton onClick={acceptOrder}>Accept</ConfirmButton>
                    </Flex>
                   
                </FlexItem>
                
                <Flex column  className='orderColumn noBorder'>
                    <FieldName>inform</FieldName>
                    <FieldValue>cancel</FieldValue>
                </Flex>
            </Flex>
        </OrderWrapper>
    )
}


const OrdersWrapper = styled.div`
    background:#eeeeee;
    /* max-width:900px; */
    width:100%;
    display:block;
    min-height:100vh;
    height:100%;
    margin: 1rem auto;
    padding:1rem 2rem;
    margin-top:0;
    .title{
        font-size:20px;
        font-weight:800;
        color:#333;
        margin-bottom:1rem;
    }
    .orderColumn{
        border-right:1px solid #ccc;
        padding:0rem 1rem;
        height: 100%;
    }
    .noBorder{
        border:none;
    }
`;
const OrderTabs = styled.div`
    background:#fff;
    padding:1rem;
    display:flex;
`
const OrderTab = styled.div`
    color:#aaaaaa;
    padding:0.5rem 1rem;
    font-size: 1.25rem;
    position:relative;
    padding-top: 1rem;
    cursor:pointer;
    &:active,&:hover{
        background:#eeeeee;
    }
    &.active{
        color: #3c4dae;
        border-bottom:2px solid currentColor;
        
    }
    &.active:before {
        content: 'New Orders';
        position: absolute;
        padding: 0.1rem 0.3rem;;
        font-size: 10px;
        color: #fff;
        background: #f1a62d;
        border-radius: 2px;
        font-weight:800;
        /* top: 0; */
        bottom: 80%;
        right: 0px;
    }
`
const OrdersCount = styled.div`
    color:#999;
    span{
        color:#aaa;
    }
    padding:1rem 0;
    font-size:1.2rem;
    padding-bottom:0;

`
const OrdersListWrapper = styled.div`

`

const OrderWrapper = styled.div`
    background:#fff;
    border-radius:5px;
    padding:0.5rem;
    margin:1rem 0;
`
export const FieldName = styled.div`
    color:#aaa;
    font-size:18px;
`
export const FieldValue = styled.div`
    font-size:20px;
    color:#3c4dae;
    font-weight:bold;
`

const OrderNum  = styled.div`

    .orderNumber{
        font-size:2rem;
        font-weight:bold;
        color:#3c4dae;
        line-height:1.2;
        text-align:center;
    }
    .time{
        font-size:12px;
        text-align:center;
    }
`

const ConfirmButton = styled.div`
    padding:0.5rem 2rem;
    text-transform:uppercase;
    background:#02C39A;
    color:#fff;
    font-weight:800;
    border-radius:5px;
    font-size:1rem;

`