import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Orders from '../../src/components/Dashboard/Orders';
import OrderDetails from '../../src/components/Dashboard/OrderDetails';
import Flex,{FlexItem} from 'styled-flex-component'
import OrderSidebar from '../../src/components/Dashboard/OrderSidebar';
import RestoMenu from '../../src/components/Dashboard/RestoMenu';
import Router,{ useRouter } from 'next/router'
import StyledModal from '../../src/components/Modal/StyledModal';
import { IsVeg } from '../../src/components/IsVeg';
import GenerateBillModal from '../../src/components/Dashboard/GenerateBillModal';
function Dashboard(props) {

    const [activeTab, setActiveTab] = useState(0);
    const   [orderDetail, setOrderDetail] = useState(null);
    const router = useRouter()
    const { res_id } = router.query
    const [billModal, setBillModal] = useState(false)
    const [id,setId] = useState(null);
    const contentRef = React.createRef();
    const [restaurant,setRestaurant] = useState(null)
    useEffect(()=>{
        const restoDetail = JSON.parse(localStorage.getItem('restoDetail'));
        if(restoDetail && restoDetail.restaurant){
            setId(restoDetail.restaurant.id)
            setRestaurant(restoDetail.restaurant)
        }else{
            Router.push('/restologin');
        }

    },[])
    
    if(!id){

        return(
            <div></div>
        )
    }else{
            return (
        <Flex>
            <OrderSidebar restaurant={restaurant} setActiveTab={setActiveTab} activeTab={activeTab}/>
            {
                activeTab === 0
                    &&
                <Orders restaurant={restaurant} res_id={id} setOrderDetail={setOrderDetail} orderDetail={orderDetail} id={id} activeTab={activeTab}/>
            }
            {
                activeTab === 1
                    &&
                <RestoMenu restaurant={restaurant} res_id={res_id} activeTab={activeTab}/>
            }
            {
                activeTab === 2
                    &&
                <RestoMenu restaurant={restaurant} res_id={res_id}/>
            }
            
            <OrderDetails restaurant={restaurant} openBillModal={()=>{setBillModal(true)}} res_id={res_id} orderDetail={orderDetail} activeTab={activeTab}/>
            {(billModal && restaurant) && <GenerateBillModal billModal={billModal} setBillModal={setBillModal} restaurant={restaurant} orderDetail={orderDetail}/>}
        </Flex>
    )
        }
}

export default Dashboard

