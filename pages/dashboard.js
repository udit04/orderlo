import React,{useState} from 'react'
import styled from 'styled-components'
import Orders from '../src/components/Dashboard/Orders';
import OrderDetails from '../src/components/Dashboard/OrderDetails';
import Flex,{FlexItem} from 'styled-flex-component'
import OrderSidebar from '../src/components/Dashboard/OrderSidebar';
import RestoMenu from '../src/components/Dashboard/RestoMenu';

function Dashboard() {

    const [activeTab, setActiveTab] = useState(0);
    const   [orderDetail, setOrderDetail] = useState(null);
    return (
        <Flex>
            <OrderSidebar setActiveTab={setActiveTab} activeTab={activeTab}/>
            {
                activeTab === 0
                    &&
                <Orders setOrderDetail={setOrderDetail} id='1' activeTab={activeTab}/>
            }
            {
                activeTab === 1
                    &&
                <RestoMenu activeTab={activeTab}/>
            }
            {
                activeTab === 2
                    &&
                <RestoMenu/>
            }
            
            <OrderDetails orderDetail={orderDetail} activeTab={activeTab}/>
        </Flex>
    )
}

export default Dashboard
