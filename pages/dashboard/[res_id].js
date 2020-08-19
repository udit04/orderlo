import React,{useState,useEffect} from 'react'
import Orders from '../../src/components/Dashboard/Orders';
import OrderDetails from '../../src/components/Dashboard/OrderDetails';
import Flex from 'styled-flex-component'
import OrderSidebar from '../../src/components/Dashboard/OrderSidebar';
import RestoMenu from '../../src/components/Dashboard/RestoMenu';
import Router,{ useRouter } from 'next/router'
import GenerateBillModal from '../../src/components/Dashboard/GenerateBillModal';
import EditOrderModal from '../../src/components/Dashboard/EditOrderModal';
import Head from 'next/head'
function Dashboard(props) {

    const [activeTab, setActiveTab] = useState(0);
    const [orderDetail, setOrderDetail] = useState(null);
    const router = useRouter()
    const { res_id } = router.query
    const [billModal, setBillModal] = useState(false)
    const [id,setId] = useState(null);
    const [restaurant,setRestaurant] = useState(null)
    const [editOrder, setEditOrder] = useState(false);
    useEffect(()=>{
        const restoDetail = JSON.parse(localStorage.getItem('restoDetail'));
        if(restoDetail && restoDetail.restaurant){
            if(res_id && parseInt(restoDetail.restaurant.id) !== parseInt(res_id)){
                Router.push('/restologin');
            }
            else{
                setId(restoDetail.restaurant.id);
                setRestaurant(restoDetail.restaurant);
            }
        }else{
            Router.push('/restologin');
        }
    },[router.query]);
    
    if(!id){
        return(
            <div>
                <Head >
                    <title>Ordrlo | Dashboard</title>
                </Head>
            </div>
        )
    }else{
        return (
            <>
            <Head >
                <title>Ordrlo | Dashboard</title>
            </Head>
            <Flex>
                <OrderSidebar restaurant={restaurant} setActiveTab={setActiveTab} activeTab={activeTab}/>
                {
                    activeTab === 0
                        &&
                    <Orders showEditOrders={editOrder} setEditOrder={setEditOrder} restaurant={restaurant} res_id={id} setOrderDetail={setOrderDetail} id={id} activeTab={activeTab} orderDetail={orderDetail} billModal={billModal}/>
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
                {(editOrder && restaurant && orderDetail)
                    &&
                <EditOrderModal  orderDetail={orderDetail} res_id={id} restaurant={restaurant} onClose={()=>{setEditOrder(false)}}>
                </EditOrderModal>
                }
            </Flex>
            </>
        )
    }
}

export default Dashboard

