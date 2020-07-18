import React,{useState,useEffect} from 'react'
import  Flex  from 'styled-flex-component';
import  Router ,{ useRouter} from 'next/router';
import SkeletonLoader from '../src/components/SkeletonLoader';
import { StackHeader } from '../src/components/Login/LoginStyled';
import { BackIcon, ShareIcon } from '../src/Icons';
import restoService from '../src/services/RestoService';
import {getDateTimeStringFromGMT} from '../src/helpers/util'
export default function OrderHistory(props) {
    const router = useRouter();
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('userData'));
        if(userData && userData.user_id)
        {
            restoService.getOrders({user_id:userData.user_id}).then(res=>{
                if(res.status===200){
                    console.log(res.data);
                    if(res.data.menu.length >0)
                        setOrders(res.data.menu);
                }
            }).catch(err=>{
                console.log(err);
            }) 
        }
    }, [])

    const viewBill = (order_id)=>{
        router.push(`/bill/${order_id}`)
    }

    return (
        <div>     
            <Flex column >
                <StackHeader>
                    <Flex justifyBetween>
                        <BackIcon height={20} width={20}/> 
                        {/* <ShareIcon height={20} width={20}/> */}
                        ORDERS
                    </Flex>
                </ StackHeader>
                {
                    !orders || !orders.length ? <SkeletonLoader screen='mobile'/> : 
                    orders.map((order)=>{
                        return <div key={order.id}>
                            <p>Restaurant Name - {order.restaurant.name}</p>
                            <p>Order ID - {order.id}</p>
                            <p>Order Date - { getDateTimeStringFromGMT(order.createdAt)}</p>
                            {order.payment_status !== 'success' ?<button onClick={()=>viewBill(order.id)}>View Bill</button> : <strong>PAID</strong>}
                            <br></br>
                        </div>
                    })
                }                
            </Flex>
        </div>
    )
}