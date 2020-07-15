import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Orders from '../../src/components/Dashboard/Orders';
import OrderDetails from '../../src/components/Dashboard/OrderDetails';
import Flex,{FlexItem} from 'styled-flex-component'
import OrderSidebar from '../../src/components/Dashboard/OrderSidebar';
import RestoMenu from '../../src/components/Dashboard/RestoMenu';
import { useRouter } from 'next/router'
import StyledModal from '../../src/components/Modal/StyledModal';
import { IsVeg } from '../../src/components/IsVeg';
function Dashboard() {

    const [activeTab, setActiveTab] = useState(0);
    const   [orderDetail, setOrderDetail] = useState(null);
    const router = useRouter()
    const { res_id } = router.query
    const [billModal, setBillModal] = useState(true)
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
            
            <OrderDetails openBillModal={setBillModal} res_id={res_id} orderDetail={orderDetail} activeTab={activeTab}/>
            <StyledModal>
                
                <BillContainer>
                    <RestoName> Shivsagar</RestoName>
                    <RestoAddress>Nashik highway, thane new bhiwandi</RestoAddress>
                    <Flex column className='billMeta'>
                        <Flex >
                            <FlexItem grow={1}>Date : 15/06/20</FlexItem> <FlexItem grow={1}>Date : 15/06/20</FlexItem>
                        </Flex>
                        <Flex>
                            <FlexItem grow={1}>Table No: 10</FlexItem> <FlexItem grow={1}>Table No: 10</FlexItem>
                        </Flex>
                        <PriceTable>
                            <BillCategory as='h3'>Food</BillCategory>
                            <Flex className='billHeader'><FlexItem  grow={1}>Item</FlexItem><FlexItem >Quantity</FlexItem> <FlexItem >Price</FlexItem></Flex>
                            <CartProduct>
                                <Flex>
                                    <FlexItem grow='1'>
                                        <Flex column>
                                            <Flex>
                                                <IsVeg style={{marginTop:'5px',marginRight:'5px'}} is_veg={1}/>
                                                <Flex column>
                                                    <Flex><ProductName>Chicken Creamy Nachos </ProductName></Flex>
                                                    <ExtraItem>Extra cheese</ExtraItem>
                                                </Flex>
                                                
                                            </Flex>
                                            
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem>
                                        <ProductCount> x 2</ProductCount>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>Rs.60</ProductCost>
                                        </Flex>
                                    </FlexItem>
                                </Flex>
                            </CartProduct>
                            <CartProduct>
                                <Flex>
                                    <FlexItem grow='1'>
                                        <Flex column>
                                            <Flex>
                                                <IsVeg style={{marginTop:'5px',marginRight:'5px'}} is_veg={1}/>
                                                <Flex column>
                                                    <Flex><ProductName>Chicken Creamy Nachos </ProductName></Flex>
                                                    <ExtraItem>Extra cheese</ExtraItem>
                                                </Flex>
                                                
                                            </Flex>
                                            
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem>
                                        <ProductCount> x 2</ProductCount>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>Rs.60</ProductCost>
                                        </Flex>
                                    </FlexItem>
                                </Flex>
                            </CartProduct>
                            <CartProduct>
                                <Flex>
                                    <FlexItem grow='1'>
                                        <Flex column>
                                            <Flex>
                                                <IsVeg style={{marginTop:'5px',marginRight:'5px'}} is_veg={1}/>
                                                <Flex column>
                                                    <Flex><ProductName>Chicken Creamy Nachos </ProductName></Flex>
                                                    <ExtraItem>Extra cheese</ExtraItem>
                                                </Flex>
                                                
                                            </Flex>
                                            
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem>
                                        <ProductCount> x 2</ProductCount>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>Rs.60</ProductCost>
                                        </Flex>
                                    </FlexItem>
                                </Flex>
                            </CartProduct>
                            <BillCategory as='h3'>Drinks</BillCategory>
                            <CartProduct>
                                <Flex>
                                    <FlexItem grow='1'>
                                        <Flex column>
                                            <Flex>
                                                <IsVeg style={{marginTop:'5px',marginRight:'5px'}} is_veg={1}/>
                                                <Flex column>
                                                    <Flex><ProductName>Chicken Creamy Nachos </ProductName></Flex>
                                                    <ExtraItem>Extra cheese</ExtraItem>
                                                </Flex>
                                                
                                            </Flex>
                                            
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem>
                                        <ProductCount> x 2</ProductCount>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>Rs.60</ProductCost>
                                        </Flex>
                                    </FlexItem>
                                </Flex>
                            </CartProduct>
                            <Flex>
                                    <FlexItem grow={1}>
                                        <SectionName> Subtotal</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>Rs.1000</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex>
                            <Flex>
                                    <FlexItem grow={1}>
                                        <SectionName> Discount</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>-Rs.100</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex>
                            <Flex>
                                    <FlexItem grow={1}>
                                        <SectionName> Vat</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>+Rs.100</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex>
                            <Flex>
                                    <FlexItem grow={1}>
                                        <SectionName> Service Charge</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>+Rs.100</ProductCost>
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
        </Flex>
    )
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