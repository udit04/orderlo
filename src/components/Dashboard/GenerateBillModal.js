import React,{useState, useEffect} from 'react'
import StyledModal from '../Modal/StyledModal';
import styled from 'styled-components'
import Flex,{FlexItem} from 'styled-flex-component';
import { IsVeg } from '../IsVeg';
import { SolidButton } from '../Login/LoginStyled';
import RestoService from '../../services/RestoService'
function GenerateBillModal(props) {
    const {billModal,setBillModal,orderDetail,restaurant} = props;
    const contentRef = React.createRef();
    const [foodDiscount, setFoodDiscount] = useState(0);
    const [drinksDiscount,setDrinksDiscount] = useState(0);
    const [serviceCharge,setServiceCharge] = useState(restaurant.service_charge)
    const [vatTax,setVatTax] = useState(restaurant.vat_tax);
    const [gstTax,setGstTax] = useState(restaurant.gst_tax);
    const [billObject,setBillObject] = useState(null);
    const [message,setMessage] = useState('');
    useEffect(() => {
        console.log(orderDetail)
        setBillObject(getBillObject());
        ()=>{
            setMessage('');
        }
    }, [])

    const discountChange = (e)=>{
        if(e.target.name==='food_discount'){
            setFoodDiscount(e.target.value)
        }else if (e.target.name==='drinks_discount'){
            setDrinksDiscount(e.target.value)
        }   

    }
    useEffect(() => {
        setBillObject(getBillObject());
    }, [foodDiscount,drinksDiscount,serviceCharge,vatTax,gstTax])

    const getBillObject  = ()=>{
        const food_discount_value = orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0) * parseFloat(foodDiscount/100);
        const food_tax_value = orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0)*parseFloat(gstTax/100);
        const food_cart_value = orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0);
        const food_final_amount = food_cart_value + food_tax_value - food_discount_value;
        const service_charge_value = orderDetail.products.reduce((a,p)=>(a + p.price * p.qty),0) * parseFloat(serviceCharge/100);
        let drinks_final_amount = 0;
        let alcoholObj  = null;
        if(orderDetail.products.filter(product=>product.is_alcohol===true).length>0){
            const drinks_discount_value = orderDetail.products.filter(product=>product.is_alcohol===true).reduce((a,p)=>(a + p.price * p.qty),0) * parseFloat(drinksDiscount/100);
            const drinks_tax_value = orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0)*parseFloat(vatTax/100);
            const drinks_cart_value = orderDetail.products.filter(product=>product.is_alcohol===true).reduce((a,p)=>(a + p.price * p.qty),0);
            
            drinks_final_amount = drinks_cart_value - drinks_discount_value + drinks_tax_value ;

            alcoholObj = {
                "sub_total": drinks_cart_value,
                "discount": {
                    "percentage": drinksDiscount,
                    "value": drinks_discount_value
                },
                "vat_tax": {
                    "percentage": drinksTax,
                    "value": drinks_tax_value 
                },
                "final_amount": drinks_final_amount
            }
        }
        const generateBillData = {

            "order_id" : orderDetail.id,
            "food": {
                "sub_total" : food_cart_value,
                "discount": {
                    "percentage": foodDiscount,
                    "value": food_discount_value
                },
                "tax" : {
                    "percentage" : gstTax,
                    "value" : food_tax_value
                },
                "final_amount": food_final_amount
            },
            "alcohol": alcoholObj,
            "service_charge" : {
                "percentage" : serviceCharge,
                "value": service_charge_value
            },
            "grand_total" : food_final_amount + drinks_final_amount + service_charge_value
        }
        return generateBillData;
    }
    const generateOrderBill = ()=>{
        // const food_discount_value = orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0) * parseFloat(foodDiscount/100);
        // const food_tax_value = orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0)*parseFloat(gstTax/100);
        // const food_cart_value = orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0);
        // const food_final_amount = food_cart_value + food_tax_value - food_discount_value;
        // const service_charge_value = orderDetail.products.reduce((a,p)=>(a + p.price * p.qty),0) * serviceCharge;
        // let drinks_final_amount = 0;
        // let alcoholObj  = null;
        // if(orderDetail.products.filter(product=>product.is_alcohol===true).length>0){
        //     const drinks_discount_value = orderDetail.products.filter(product=>product.is_alcohol===true).reduce((a,p)=>(a + p.price * p.qty),0) * parseFloat(drinksDiscount/100);
        //     const drinks_tax_value = orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0)*parseFloat(vatTax/100);
        //     const drinks_cart_value = orderDetail.products.filter(product=>product.is_alcohol===true).reduce((a,p)=>(a + p.price * p.qty),0);
            
        //     drinks_final_amount = drinks_cart_value - drinks_discount_value + drinks_tax_value ;

        //     alcoholObj = {
        //         "sub_total": drinks_cart_value,
        //         "discount": {
        //             "percentage": drinksDiscount,
        //             "value": drinks_discount_value
        //         },
        //         "vat_tax": {
        //             "percentage": drinksTax,
        //             "value": drinks_tax_value 
        //         },
        //         "final_amount": drinks_final_amount
        //     }
        // }
        // const generateBillData = {

        //     "order_id" : orderDetail.id,
        //     "food": {
        //         "sub_total" : food_cart_value,
        //         "discount": {
        //             "percentage": foodDiscount,
        //             "value": food_discount_value
        //         },
        //         "tax" : {
        //             "percentage" : gstTax,
        //             "value" : food_tax_value
        //         },
        //         "final_amount": food_final_amount
        //     },
        //     "alcohol": alcoholObj,
        //     "service_charge" : {
        //         "percentage" : serviceCharge,
        //         "value": service_charge_value
        //     },
        //     "grand_total" : food_final_amount + drinks_final_amount + service_charge_value
        // }
        console.log('__generateBill',getBillObject());
        RestoService.generateBill(getBillObject()).then(res=>{
            console.log(res);
            if(res.status){
                setMessage(res.data.message);
            }
        }).catch(err=>{
            console.log(err);
            setMessage('something went wrong');
        })
    }
    if(billObject === null){
        return null
    }else return (
        <div>
                <StyledModal onClose={()=>{setBillModal(false)}} contentRef={contentRef}>
                
                <BillContainer ref={contentRef}>
            <RestoName> {restaurant.name}</RestoName>
            <div style={{textAlign:'center'}}>{message}</div>
                    <RestoAddress>{restaurant.address}</RestoAddress>
                    <Flex column className='billMeta'>
                        <Flex >
            <FlexItem grow={1}>Date : {(new Date(orderDetail.createdAt)).getDate() + '/' + ((new Date(orderDetail.createdAt)).getMonth()+1) + '/' + ((new Date(orderDetail.createdAt)).getFullYear() - 2000)}</FlexItem> 
            {/* <FlexItem grow={1}>Date : 15/06/20</FlexItem> */}
                        </Flex>
                        <Flex>
                             <FlexItem grow={1}>Table No: {orderDetail.table_no}</FlexItem> 
                             {/* <FlexItem grow={1}>Table No: 10</FlexItem> */}
                        </Flex>
                        <PriceTable>
                        <Flex className='billHeader'><FlexItem  grow={1}>Item</FlexItem><FlexItem ><span>Quantity</span></FlexItem> <FlexItem ><span>Price</span></FlexItem></Flex>

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
                                                        <ProductCost>Rs.{billObject.food.sub_total}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                        
                                        <Flex>
                                                <FlexItem grow={1}>
                                                    <SectionName> Gst</SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column>
                                                        <ProductCost>+Rs.{parseInt(billObject.food.tax.value)}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                        <Flex>
                                                <FlexItem grow={1}>
                                                    <SectionName>Food Discount  @<input type='number' style={{width:'50px'}} name='food_discount' min="0" value={foodDiscount} onChange={discountChange}/></SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column>
                                    <ProductCost>-Rs.{parseInt(billObject.food.discount.value)}</ProductCost>
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
                                                    <SectionName>Vat @<input type='number' style={{width:'50px'}} min="0" name='vat_tax' value={vatTax} onChange={(e)=>{setVatTax(e.target.value)}}/></SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column>
                                                        <ProductCost> + Rs.{parseInt(billObject.drinks.vat_tax.value)}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                        <Flex>
                                                <FlexItem grow={1}>
                                                    <SectionName>Drinks Discount @<input type='number' min="0" style={{width:'50px'}} name='drinks_discount' value={drinksDiscount} onChange={discountChange}/></SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column>
                                                        <ProductCost>-Rs.{parseInt(billObject.alchohol.discount.value)}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                    </>
                                    :''
                            }
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
                                        <SectionName>Service charge  @<input type='number' style={{width:'50px'}} min="0" name='vat_tax' value={serviceCharge} onChange={(e)=>{setServiceCharge(e.target.value)}}/></SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column>
                        <ProductCost>+Rs.{billObject.service_charge.value}</ProductCost>
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
                                            <ProductCost>Rs.{billObject.grand_total}</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex>
                            <Separator/>
                        </PriceTable>
                        <SolidButton onClick={generateOrderBill}>Generate Order Bill</SolidButton>
                    </Flex>
                </BillContainer>

            </StyledModal>
        </div>
    )
}

export default GenerateBillModal

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
        span{
            width:90px;
            padding: 0 10px;
        }
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
    width:100px;
    padding:0 10px;
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