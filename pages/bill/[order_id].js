import React,{useState,useEffect} from 'react'
import  Flex  from 'styled-flex-component';
import  Router ,{ useRouter} from 'next/router';
import SkeletonLoader from '../../src/components/SkeletonLoader';
import { StackHeader } from '../../src/components/Login/LoginStyled';
import { BackIcon, ShareIcon } from '../../src/Icons';
import restoService from '../../src/services/RestoService';
import {getDateTimeStringFromGMT} from '../../src/helpers/util'
export default function Restaurant(props) {
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState(null);
    const {order_id} = router.query;

    useEffect(() => {
        console.log('order_id',order_id);
        if(order_id)
        {
            restoService.getBillDetails({order_id:order_id}).then(res=>{
                if(res.status===200){
                    console.log(res.data);
                    setOrderDetails(res.data.result);
                }
                else{
                    alert('Bill Not generated yet 1!');
                    router.push('/orders')
                }
            }).catch(err=>{
                console.log(err);
                alert('Bill Not generated yet 2!');
                router.push('/orders');
            }) 
        }
    }, [order_id])

    return (
        <div>     
            <Flex column >
                <StackHeader>
                    <Flex justifyBetween>
                        <BackIcon height={20} width={20}/> 
                        {/* <ShareIcon height={20} width={20}/> */}
                        BILL
                    </Flex>
                </ StackHeader>               
            </Flex>
        </div>
    )
}