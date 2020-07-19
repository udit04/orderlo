import React from 'react'
import  Flex,{FlexItem}  from 'styled-flex-component';
import { FieldValue,FieldName } from './Orders';
import styled from 'styled-components'
import { IsVeg } from '../IsVeg';
import { SolidButton } from '../Login/LoginStyled';
// import OrderDetails from './OrderDetails';
import StyledModal from '../Modal/StyledModal';

function OrderDetails(props) {
    const {orderDetail} = props;
    console.log(props.orderDetail && orderDetail.products);
    if(!orderDetail || orderDetail.products.length===0){
        return null;
    }else {
        return (
        <DetailsWrapper>
            <div>
            <DetailHeader  > OrderDetails 
                { ['created','accepted'].includes(orderDetail.order_status) 
                    && 
                <span>New order</span>}
            </DetailHeader>

            <Separator/>
            <DetailsMeta>
                <Flex >
                    {/* <FlexItem grow='1'>
                        <Flex column>
                            <FieldName>Total</FieldName>
                            <FieldValue>Rs.{orderDetail.total_amount}</FieldValue>
                        </Flex>
                    </FlexItem> */}
                    <FlexItem grow='1'>
                        <Flex column>
                            <FieldName>Order number</FieldName>
                            <FieldValue>{orderDetail.id}</FieldValue>
                        </Flex>
                    </FlexItem>
                </Flex>
            </DetailsMeta>
            <Separator/>
            <DetailsMeta>
                <Flex>
                    <FlexItem grow='1'>
                        <Flex column>
                            <Flex><DetailMain>Product Details</DetailMain></Flex>
                        </Flex>
                    </FlexItem>
                    <FlexItem >
                        <Flex column>
                            <Flex><DetailMain>Cost</DetailMain></Flex>
                        </Flex>
                    </FlexItem>
                </Flex>
            </DetailsMeta>
            <Separator/>
            {
                orderDetail.products.map(product=>{
                    return(
                        <CartProduct>
                            <Flex>
                                <FlexItem grow='1'>
                                    <Flex column>
                                        <Flex>
                                            <IsVeg style={{marginTop:'5px',marginRight:'5px'}} is_veg={product.is_veg}/>
                                            <Flex column>
                                                <Flex><ProductName>{product.name} </ProductName><ProductCount> x {product.qty}</ProductCount></Flex>
                                                {/* <ExtraItem>Extra cheese</ExtraItem> */}
                                            </Flex>
                                            
                                        </Flex>
                                        
                                    </Flex>
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
           
            <Separator/>
            <Flex>
                <FlexItem grow='1'>
                    <Flex column>
                        <Flex><DetailMain>Food Bill Details</DetailMain></Flex>
                    </Flex>
                </FlexItem>
                
            </Flex>
            {/* <Separator/> */}
            <CartProduct>
                <Flex>
                    <FlexItem grow='1'>
                        <Flex column>
                            {/* <Flex><ProductName><IsVeg is_veg={1}/>Chicken Creamy Nachos </ProductName><ProductCount> x 2</ProductCount></Flex> */}
                            <ExtraItem>Items Total</ExtraItem>
                        </Flex>
                    </FlexItem>
                    <FlexItem >
                        <Flex column>
                            <ProductCost>{orderDetail.products.length}</ProductCost>
                        </Flex>
                    </FlexItem>
                </Flex>
                {/* <Flex>
                    <FlexItem grow='1'>
                        <Flex column>
                            <Flex><ProductName><IsVeg is_veg={1}/>Chicken Creamy Nachos </ProductName><ProductCount> x 2</ProductCount></Flex>
                            <ExtraItem>Service Charge( 10%)</ExtraItem>
                        </Flex>
                    </FlexItem>
                    <FlexItem >
                        <Flex column>
                            <ProductCost>Rs. {orderDetail.total_tax}</ProductCost>
                        </Flex>
                    </FlexItem>
                </Flex> */}
            </CartProduct>
            {/* <Separator/> */}
            {/* <Flex alignCenter>
                    <FlexItem grow='1'>
                        <Flex column>
                            <DetailMain>Total</DetailMain>
                           
                        </Flex>
                    </FlexItem>
                    <FlexItem >
                        <Flex column>
        <ProductCost>Rs.{orderDetail.total_amount}</ProductCost>
                        </Flex>
                    </FlexItem>
                </Flex>
            <Separator/> */}
            {
                ['created','accepted'].includes(orderDetail.order_status)
                    &&
                <SolidButton onClick={props.openBillModal}>
                    Generate Bill
                </SolidButton>
            }
            {/* </CartProduct> */}
            
            </div>

        </DetailsWrapper>
        )
    }
}

export default OrderDetails

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
    width:100px;
`
const ExtraItem = styled.div`
    color:#aaaaaa;
`
const ProductCount = styled.div`
    color:#3c4dae;
    font-weight:bold;
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
`