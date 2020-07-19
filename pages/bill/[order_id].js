import React,{useState,useEffect} from 'react'
import { useRouter} from 'next/router';
import SkeletonLoader from '../../src/components/SkeletonLoader';
import restoService from '../../src/services/RestoService';
import styled from 'styled-components'
import Flex,{FlexItem} from 'styled-flex-component'
import StyledModal from '../../src/components/Modal/StyledModal';
import { IsVeg } from '../../src/components/IsVeg';

export default function Bill(props) {
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState(null);
    const {order_id} = router.query;

    useEffect(() => {
        if(order_id)
        {
            restoService.getBillDetails({order_id:order_id}).then(res=>{
                if(res.status===200){
                    console.log(res.data);
                    setOrderDetails(res.data.result);
                }
                else{
                    alert('Bill Not generated yet!');
                    router.push('/orders')
                }
            }).catch(err=>{
                console.log(err);
                alert('Bill Not generated yet!');
                router.push('/orders');
            }) 
        }
    }, [order_id]);

    if(!orderDetails){
        return <SkeletonLoader screen='mobile'/>
    }

    return (
        <div>     
            <Flex column >
                {   orderDetails
                    &&
                <StyledModal onClose={()=>{setBillModal(false)}}>
                    <BillContainer >
                    <RestoName> {orderDetails.restaurant.name}</RestoName>
                    <RestoAddress>{orderDetails.restaurant.address}</RestoAddress>
                    <Flex column className='billMeta'>
                        <Flex>
                             <FlexItem grow={2}>Customer Name - {orderDetails.user.first_name + " "+ orderDetails.user.last_name}</FlexItem>
                        </Flex>
                        <Flex >
                            <FlexItem grow={1}>Date : {(new Date(orderDetails.order_date)).getDate() + '/' + ((new Date(orderDetails.order_date)).getMonth()+1) + '/' + ((new Date(orderDetails.order_date)).getFullYear() - 2000)}</FlexItem>
                        </Flex>
                        <Flex>
                             <FlexItem grow={1}>Table No: {orderDetails.table_no}</FlexItem>
                        </Flex>
                        <PriceTable>
                        <Flex className='billHeader'><FlexItem  grow={1}>Item</FlexItem><FlexItem >Quantity&nbsp;</FlexItem> <FlexItem >Price</FlexItem></Flex>
                            {
                                orderDetails.food 
                                    ?
                                    <>
                                    <BillCategory as='h3'>Food</BillCategory>   
                                    {orderDetails.food.products.map((product,i)=>{
                                            return(
                                                <CartProduct key={i}>
                                                    <Flex>
                                                        <FlexItem grow='1'>
                                                            <Flex column>
                                                                <Flex>
                                                                    {/* <IsVeg style={{marginTop:'5px',marginRight:'5px'}} is_veg={product.is_veg}/> */}
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
                                                                <ProductCost>Rs.{parseInt(product.final_price)}</ProductCost>
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
                                                <ProductCost>Rs.{orderDetails.food.sub_total}</ProductCost>
                                            </Flex>
                                        </FlexItem>
                                    </Flex>
                                    {
                                        orderDetails.food.discount && orderDetails.food.discount.value>0 ?
                                        <Flex>
                                            <FlexItem grow={1}>
                                                <SectionName>Discount @ {orderDetails.food.discount.percentage}</SectionName>
                                            </FlexItem>
                                            <FlexItem >
                                                <Flex column>
                                                    <ProductCost>-Rs.{orderDetails.food.discount.value}</ProductCost>
                                                </Flex>
                                            </FlexItem>
                                        </Flex> : 
                                        null
                                    }
                                    <Flex>
                                            <FlexItem grow={1}>
                                                <SectionName>Gst</SectionName>
                                            </FlexItem>
                                            <FlexItem >
                                                <Flex column>
                                                    <ProductCost>+Rs.{orderDetails.food.tax.value}</ProductCost>
                                                </Flex>
                                            </FlexItem>
                                    </Flex>
                                    </>
                                    :''
                            }
                            {orderDetails.alcohol  
                                ?
                                <>
                                    <BillCategory as='h3'>Drinks</BillCategory>
                                    {orderDetails.alcohol.products.map((product,i)=>{
                                            return(
                                                <CartProduct key={i}>
                                                    <Flex>
                                                        <FlexItem grow='1'>
                                                            <Flex column>
                                                                <Flex>
                                                                    {/* <IsVeg style={{marginTop:'5px',marginRight:'5px'}} is_veg={product.is_veg}/> */}
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
                                                                <ProductCost>Rs.{parseInt(product.final_price)}</ProductCost>
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
                                                        <ProductCost>Rs.{orderDetails.alcohol.sub_total}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                        {
                                            orderDetails.alcohol.discount && orderDetails.alcohol.discount.value>0 ?
                                            <Flex>
                                                <FlexItem grow={1}>
                                                    <SectionName>Discount @ {orderDetails.alcohol.discount.percentage}</SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column>
                                                        <ProductCost>-Rs.{orderDetails.alcohol.discount.value}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                            </Flex> : 
                                            null
                                        }
                                        <Flex>
                                                <FlexItem grow={1}>
                                                    <SectionName>Vat</SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column>
                                    <ProductCost>+Rs.{orderDetails.alcohol.vat_tax.value}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                    </>
                                    :''
                            }
                            
                            
                            {/* <Flex>
                                    <FlexItem grow={1}>
                                        <SectionName> Discount</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>-Rs.__</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex> */}
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

                            {
                                orderDetails.service_charge.value>0 ?
                                <Flex>
                                    <FlexItem grow={1}>
                                    <SectionName> Service Charge @ {}</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>+Rs.{orderDetails.service_charge.value} </ProductCost>
                                        </Flex>
                                    </FlexItem>
                                </Flex>
                            :null
                            }

                            
                            <Separator/>
                            <Flex>
                                    <FlexItem grow={1}>
                                        <SectionName> Grand Total</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                                            <ProductCost>{orderDetails.grand_total}</ProductCost>
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
        </div>
    )
}

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