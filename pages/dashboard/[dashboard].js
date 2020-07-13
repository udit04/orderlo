import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Orders from '../../src/components/Dashboard/Orders';
import OrderDetails from '../../src/components/Dashboard/OrderDetails';
import Flex,{FlexItem} from 'styled-flex-component'
import OrderSidebar from '../../src/components/Dashboard/OrderSidebar';
import RestoMenu from '../../src/components/Dashboard/RestoMenu';
import { useRouter } from 'next/router'
function Dashboard() {

    const [activeTab, setActiveTab] = useState(0);
    const   [orderDetail, setOrderDetail] = useState(null);
    const router = useRouter()
    const { res_id } = router.query
    useEffect(() => {
        
        
    }, [])
    return (
        <Flex>
            <OrderSidebar setActiveTab={setActiveTab} activeTab={activeTab}/>
            {
                activeTab === 0
                    &&
                <Orders res_id={res_id} setOrderDetail={setOrderDetail} id='1' activeTab={activeTab}/>
            }
            {
                activeTab === 1
                    &&
                <RestoMenu res_id={res_id} activeTab={activeTab}/>
            }
            {
                activeTab === 2
                    &&
                <RestoMenu res_id={res_id}/>
            }
            
            <OrderDetails res_id={res_id} orderDetail={orderDetail} activeTab={activeTab}/>
        </Flex>
    )
}

export default Dashboard
