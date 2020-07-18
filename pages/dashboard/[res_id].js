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
            <OrderSidebar setActiveTab={setActiveTab} activeTab={activeTab}/>
            {
                activeTab === 0
                    &&
                <Orders restaurant={restaurant} res_id={id} setOrderDetail={setOrderDetail} id={id} activeTab={activeTab}/>
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
            {   billModal && restaurant
                    &&
                <StyledModal onClose={()=>{setBillModal(false)}} contentRef={contentRef}>
                
                <BillContainer ref={contentRef}>
            <RestoName> {restaurant.name}</RestoName>
                    <RestoAddress>{restaurant.address}</RestoAddress>
                    <Flex column className='billMeta'>
                        <Flex >
            <FlexItem grow={1}>Date : {(new Date(orderDetail.createdAt)).getDate() + '/' + ((new Date(orderDetail.createdAt)).getMonth()+1) + '/' + ((new Date(orderDetail.createdAt)).getFullYear() - 2000)}</FlexItem> <FlexItem grow={1}>Date : 15/06/20</FlexItem>
                        </Flex>
                        <Flex>
                             <FlexItem grow={1}>Table No: {orderDetail.table_no}</FlexItem> <FlexItem grow={1}>Table No: 10</FlexItem>
                        </Flex>
                        <PriceTable>
                        <Flex className='billHeader'><FlexItem  grow={1}>Item</FlexItem><FlexItem >Quantity</FlexItem> <FlexItem >Price</FlexItem></Flex>

                            {
                                orderDetail.products.filter(product=>product.is_alcohol===false).length>0 
                                    ?
                                    <>
                                    <BillCategory as='h3'>Food</BillCategory>
                                    
                                    {orderDetail.products.filter(product=>product.is_alcohol===false).map(product=>{
                                            return(
                                                <CartProduct>
                                                    <Flex>
                                                        <FlexItem grow='1'>
                                                            <Flex column>
                                                                <Flex>
                                                                    <IsVeg style={{marginTop:'5px',marginRight:'5px'}} is_veg={product.is_veg}/>
                                                                    <Flex column>
                                                                        <Flex><ProductName>{product.name} </ProductName></Flex>
                                                                        {/* <ExtraItem>Extra cheese</ExtraItem> */}
                                                                    </Flex>
                                                                    
                                                                </Flex>
                                                                
                                                            </Flex>
                                                        </FlexItem>
                                                        <FlexItem>
                                                            <ProductCount> x {product.qty}</ProductCount>
                                                        </FlexItem>
                                                        <FlexItem >
                                                            <Flex column>
                                                                <ProductCost>Rs.{parseInt(product.price) * product.qty}</ProductCost>
                                                            </Flex>
                                                        </FlexItem>
                                                    </Flex>
                                                </CartProduct>

                                            )
                                        })
                                        }
                                        <Flex>
                                                <FlexItem grow={1}>
                                                    <SectionName>Food Subtotal</SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column>
                                    <ProductCost>Rs.{orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0)}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                        <Flex>
                                                <FlexItem grow={1}>
                                                    <SectionName> Gst</SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column>
                                    <ProductCost>+Rs.{orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0) * restaurant.gst_tax/100}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                    </>
                                    :''
                            }
                            {orderDetail.products.filter(product=>product.is_alcohol===true).length>0  
                                ?
                                <>
                                    <BillCategory as='h3'>Drinks</BillCategory>
                                    {orderDetail.products.filter(product=>product.is_alcohol===true).length>0 && orderDetail.products.filter(product=>product.is_alcohol===true).map(product=>{
                                            return(
                                                <CartProduct>
                                                    <Flex>
                                                        <FlexItem grow='1'>
                                                            <Flex column>
                                                                <Flex>
                                                                    <IsVeg style={{marginTop:'5px',marginRight:'5px'}} is_veg={product.is_veg}/>
                                                                    <Flex column>
                                                                        <Flex><ProductName>{product.name} </ProductName></Flex>
                                                                        {/* <ExtraItem>Extra cheese</ExtraItem> */}
                                                                    </Flex>
                                                                    
                                                                </Flex>
                                                                
                                                            </Flex>
                                                        </FlexItem>
                                                        <FlexItem>
                                                            <ProductCount> x {product.qty}</ProductCount>
                                                        </FlexItem>
                                                        <FlexItem >
                                                            <Flex column>
                                                                <ProductCost>Rs.{parseInt(product.price) * product.qty}</ProductCost>
                                                            </Flex>
                                                        </FlexItem>
                                                    </Flex>
                                                </CartProduct>

                                            )
                                        })
                                        }
                                        <Flex>
                                                <FlexItem grow={1}>
                                                    <SectionName>Drinks Subtotal</SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column>
                                                        <ProductCost>Rs.1000</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                        <Flex>
                                                <FlexItem grow={1}>
                                                    <SectionName> Vat</SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column>
                                    <ProductCost>+Rs.{orderDetail.products.filter(product=>product.is_alcohol===true).reduce((a,p)=>(a + p.price * p.qty),0)*restaurant.vat_tax}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                    </>
                                    :''
                            }
                            
                            
                            <Flex>
                                    <FlexItem grow={1}>
                                        <SectionName> Discount</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>-Rs.__</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex>
                            {/* <Flex>
                                    <FlexItem grow={1}>
                                        <SectionName> Vat</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>+Rs.100</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex> */}
                            <Flex>
                                    <FlexItem grow={1}>
                                        <SectionName> Service Charge</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                        <ProductCost>+Rs.{orderDetail.products.reduce((a,p)=>(a + p.price * p.qty),0) * restaurant.service_charge}</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex>
                            <Separator/>
                            <Flex>
                                    <FlexItem grow={1}>
                                        <SectionName> Grant Total</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>Rs.1200</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex>
                            <Separator/>
                        </PriceTable>
                    </Flex>
                </BillContainer>

            </StyledModal>
            }
        </Flex>
    )
        }
}

export default Dashboard

const BillContainer = styled.div`
    max-width: 450px;
    width: 100%;
    background: #fff;
    border-radius: 20px;
    min-height: 400px;
    max-height: 90vh;
    padding:2rem;
    .billMeta{
        font-size:1rem;
        color:#999;
    }
`
const SectionName= styled.div`
    font-size:1rem;font-weight:800;
    color:#999;
`
const BillCategory = styled.div`
    font-size:1rem;
    color:#666;
    margin:0;
`
const PriceTable = styled.div`
    padding:1rem 0;
    .billHeader{
        text-align:left;
        font-weight:800;
    }
`
const RestoName = styled.div`
    font-size:1.25rem;
    font-weight:800;
    color:#333;
    text-align:center;
`
const RestoAddress = styled.div`
    font-size:14px;
    color:#999;
    text-align:center;
`

const DetailsWrapper = styled.div`
    display: block;
    position: relative;
    padding: 1rem;
    width: 100%;
    max-width: 400px;
    &> div{
        position: sticky;
        top: 0;
    }
`

const DetailHeader  = styled.div`
    color:#3c4dae;
    font-size:1.25rem;
    padding:1rem 0;
    font-weight:800;
    span{
        position: relative;
        padding: 0.1rem 0.3rem;;
        font-size: 10px;
        color: #fff;
        background: #f1a62d;
        border-radius: 2px;
        font-weight:800;
        /* top: 0; */
        margin-left:1rem;
        vertical-align:middle;
        }
`
const DetailsMeta = styled.div`
    padding: 0.5rem 0;
    /* border: 1px solid #cccccc; */
    border-right: 0;
    border-left: 0;
    margin: 0.5rem 0;
    margin-bottom: 1rem;
    margin-right: 2rem;
`

const ProductName  = styled.div`
    color:#333333;
    font-size:14px;
`
const ProductCost = styled.div`
    color:#333333;
    font-size:14px;
    width:50px;
    text-align:center;
`
const ExtraItem = styled.div`
    color:#aaaaaa;
`
const ProductCount = styled.div`
    color:#3c4dae;
    font-weight:bold;
    width:50px;
    text-align:center;
`
const CartProduct  = styled.div`
    padding-bottom:1rem;
`
const DetailMain = styled.div`
    font-size:1.25rem;
    color:#3c4dae;
`

const Separator = styled.div`
    width:100%;
    height:1px;
    background:#ccc;
    margin-right:1rem;
    margin-bottom:1rem;
    margin-top:1rem;
`