import React,{ useEffect, useState} from 'react'
import styled from 'styled-components'
import Flex,{FlexItem} from 'styled-flex-component'
import RestoService from '../../services/RestoService'
function Orders(props) {
    const { setOrderDetail, setEditOrder } = props;
    const [err, setErr] = useState(null)
    const [ordersData,setOrdersData] = useState(null);
    const [orderTab,setOrderTab] = useState(0)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getOrders(props.id);
    //       }, 5000);
    //       return () => clearInterval(interval);
    // }, [ordersData])

    useEffect(() => {
        getOrders(props.id);
    }, [props.id]);

    const getOrders = (id)=>{
        const query = {id};
        if(ordersData && ordersData.menu){
            query.order_length = ordersData.menu.length
        }
        RestoService.getOrders(query).then(res=>{
            if(res.status === 200 && res.data.menu){
                setOrdersData(res.data);
                //props.setOrderDetail(res.data.menu[0]);
            }else{
                if(!res.data.message)
                    setErr(err);
            }
        }).catch(err=>{
            setErr(err);
            console.log(err)
        })
    }
    const acceptOrder = (order_id)=>{
        RestoService.acceptOrder(
            {
                "restaurant_id" : props.id,
                "order_id" : order_id,
                "order_status" : "accepted",
                "payment_status" : "pending"
            }
        ).then(res=>{
            if(res.status===200){
                const new_orders = ordersData;
                new_orders.menu = ordersData.menu.map((order)=>{
                    order = Object.assign({},order);
                    if(order.id === order_id){
                        order.order_status = "accepted";
                        order.payment_status = "pending";
                    }
                    return order;
                });
                //setOrdersData(new_orders);
                getOrders(props.id);
            }
        }).catch(err=>{
            console.log('err',err);
            console.log('something went wrong')
        })
    }
    const cancelOrder = (order_id)=>{
            RestoService.acceptOrder(
                {
                    "restaurant_id" : props.id,
                    "order_id" : order_id,
                    "order_status" : "rejected",
                    "payment_status" : "pending"
                }
            ).then(res=>{
                if(res.status===200){
                    getOrders(props.id);
                }
            }).catch(err=>{
                console.log('something went wrong')
            })
    }
    const deliverOrder = (order_id)=>{
        RestoService.acceptOrder(
            {
                "restaurant_id" : props.id,
                "order_id" : order_id,
                "order_status" : "delivered",
                "payment_status" : "success"
            }
        ).then(res=>{
            if(res.status===200){
                getOrders(props.id);
            }
        }).catch(err=>{
            console.log('err',err);
            console.log('something went wrong')
        })
    }
    const editOrder = (data)=>{
        setOrderDetail(data);
        setEditOrder(true);
    }
    return (
        <OrdersWrapper>
            <div className="title">Orders</div>
            <OrderTabs>
                <OrderTab onClick={()=>{setOrderTab(0)}} className={orderTab===0?'active newOrders':'newOrders'}>Pending orders</OrderTab>
                <OrderTab onClick={()=>{setOrderTab(1)}} className={orderTab===1?'active':''}>Completed orders</OrderTab>
                <OrderTab className={orderTab===2?'active':''} onClick={()=>{setOrderTab(2)}}>Order history</OrderTab>
            </OrderTabs>

            {   ordersData && ordersData.menu && ordersData.menu.length>0
                &&
                <OrdersListWrapper>
                    <OrdersCount>Today <span>{ordersData.menu.length} Orders</span></OrdersCount>
                    { orderTab ===0 && 
                    ordersData.menu.filter(data=>((data.order_status==="accepted"||data.order_status==="created") ) ).map((data,i)=>{
                        return(
                            <Order editOrder={editOrder} deliverOrder={deliverOrder} acceptOrder={acceptOrder} cancelOrder={cancelOrder}  setOrderDetail={props.setOrderDetail} data={data} key={i}/>
                        )
                    })}
                    { orderTab === 1 && 
                    ordersData.menu.filter(data=>(data.order_status==="delivered") && data.payment_status ==='success').map((data,i)=>{
                        return(
                            <Order editOrder={editOrder} deliverOrder={deliverOrder} acceptOrder={acceptOrder} cancelOrder={cancelOrder} deliverOrder={deliverOrder}  setOrderDetail={props.setOrderDetail} data={data} key={i}/>
                        )
                    })}
                    { orderTab === 2 && 
                    ordersData.menu.filter(data=>(data.order_status!=="created" && data.order_status!=="accepted") ).map((data,i)=>{
                        return(
                            <Order editOrder={editOrder} deliverOrder={deliverOrder} acceptOrder={acceptOrder} cancelOrder={cancelOrder} setOrderDetail={props.setOrderDetail} data={data} key={i}/>
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


function Order(props){
    const {data,cancelOrder,acceptOrder,deliverOrder ,editOrder} = props;
    return (
        <OrderWrapper onClick={()=>{props.setOrderDetail(data)}}>
            <Flex alignCenter>
                <Flex column className='orderColumn'>
                        <OrderNum>
                            <Flex column>
                                <div className='orderNumber'>{data.table_no}</div>
                                <div className="time">{new Date(data.createdAt).toLocaleTimeString()}</div>
                            </Flex>
                            
                        </OrderNum>
                </Flex>
                <Flex column  className='orderColumn'>
                    <FieldName>Order number</FieldName>
    <FieldValue>{data.id}</FieldValue>
                </Flex>
                <FlexItem grow="1">
                        <Flex column   className='orderColumn' justifyCenter={data.order_status==='created'} alignStretch>
                  
                            {
                            data.order_status==='created'
                                ?
                                <>
                                    <Flex alignCenter justifyBetween>
                                        <Flex column><FieldName>Total</FieldName>
                                        
                                            <FieldValue>Rs. {data.cart_amount}</FieldValue>
                                        </Flex>   
                                        <Flex column>
                                            <ConfirmButton onClick={()=>acceptOrder(data.id)}>Accept</ConfirmButton>
                                            <OrderStatus error={data.order_status==='rejected'}>{data.order_status} : <span style={{color:data.payment_status!=='success'?'#f1a62d':''}}>payment - {data.payment_status}</span></OrderStatus>

                                        </Flex>
                                    </Flex>
                                </>
                                :
                                <>
                                    <Flex alignCenter justifyBetween>
                                        <Flex column><FieldName>Total</FieldName>
                                        
                                            <FieldValue>Rs. {data.cart_amount}</FieldValue>
                                            {/* <OrderStatus error={data.order_status==='rejected'}>{data.order_status} : payment - {data.payment_status}</OrderStatus> */}
                                        </Flex>   
                                        {
                                        (data.order_status==='accepted' && data.payment_status==='pending')
                                            ?
                                            <Flex column>
                                                <ConfirmButton onClick={()=>deliverOrder(data.id)}>MARK AS DONE</ConfirmButton>
                                                <OrderStatus error={data.order_status==='rejected'}>{data.order_status} : <span style={{color:data.payment_status!=='success'?'#f1a62d;':''}}>payment - {data.payment_status}</span></OrderStatus>

                                            </Flex>
                                            :
                                            <Flex column>
                                                <OrderStatus error={data.order_status==='rejected'}>{data.order_status} : <span style={{color:data.payment_status!=='success'?'#f1a62d;':''}}>payment - {data.payment_status}</span></OrderStatus>

                                            </Flex>
                                        }
                                    </Flex>
                                </>
                            }
                        
                    </Flex>
                   
                </FlexItem>
                
                <Flex column  className='orderColumn noBorder'>
                    <FieldName>inform</FieldName>
                    {   
                        data.order_status ==='created'
                            && 
                        <FieldValue onClick={()=>cancelOrder(data.id)}>cancel</FieldValue>
                    }
                    {   data.order_status ==='accepted'
                            && 
                        <ConfirmButton onClick={()=>editOrder(data)}>Edit Order</ConfirmButton>
                    }
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
        font-weight:bold;
        border-bottom:2px solid currentColor;
        
    }
    &.newOrders:before {
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
        right: 20px;
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
    cursor:pointer;
    text-align:center;
`

const OrderStatus = styled.div`
    color:#02C39A;
    color:${props=>props.error?`red;`:'#02C39A;'}
`


export default Orders
