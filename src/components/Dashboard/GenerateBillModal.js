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
    const [serviceCharge,setServiceCharge] = useState(restaurant.service_charge || 0)
    const [vatTax,setVatTax] = useState(restaurant.vat_tax || 0);
    const [gstTax,setGstTax] = useState(restaurant.gst_tax || 5);
    const [billObject,setBillObject] = useState(null);
    const [message,setMessage] = useState('');
    useEffect(() => {
        setBillObject(getBillObject());
        ()=>{
            setMessage('');
        }
    }, [])

    const discountChange = (e)=>{
        const val = e.target.value;
        if(e.target.name==='food_discount'){
            setFoodDiscount(val)
        }else if (e.target.name==='drinks_discount'){
            setDrinksDiscount(val)
        }   

    }

    useEffect(() => {
        setBillObject(getBillObject());
    }, [foodDiscount,drinksDiscount,serviceCharge,vatTax,gstTax])

    const getBillObject  = ()=>{
        let food_disc = foodDiscount,drinks_disc = drinksDiscount,service_charge = serviceCharge,vat_tax = vatTax;
        if(food_disc === ''){
            food_disc = 0
        }
        if(drinks_disc === ''){
            drinks_disc = 0
        }
        if(service_charge === ''){
            service_charge = 0
        }
        if(vat_tax === ''){
            vat_tax = 0
        }
        food_disc = parseFloat(food_disc);drinks_disc = parseFloat(drinks_disc);service_charge = parseFloat(service_charge);vat_tax = parseFloat(vat_tax);
        const food_discount_value = orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0) * parseFloat(food_disc/100);

        const food_cart_value = orderDetail.products.filter(product=>product.is_alcohol===false).reduce((a,p)=>(a + p.price * p.qty),0);
        const food_tax_value = (food_cart_value-food_discount_value)*parseFloat(gstTax/100);
        const food_final_amount = food_cart_value + food_tax_value - food_discount_value;

        let drinks_final_amount = 0;
        let alcoholObj  = null;
        if(orderDetail.products.filter(product=>product.is_alcohol===true).length>0){
            const drinks_discount_value = orderDetail.products.filter(product=>product.is_alcohol===true).reduce((a,p)=>(a + p.price * p.qty),0) * parseFloat(drinks_disc/100);
            const drinks_cart_value = orderDetail.products.filter(product=>product.is_alcohol===true).reduce((a,p)=>(a + p.price * p.qty),0);

            const drinks_tax_value = (drinks_cart_value-drinks_discount_value)*parseFloat(vat_tax/100);
            
            drinks_final_amount = drinks_cart_value - drinks_discount_value + drinks_tax_value ;

            alcoholObj = {
                "sub_total": parseFloat(drinks_cart_value.toFixed(2)),
                "discount": {
                    "percentage": parseFloat(drinks_disc.toFixed(2)),
                    "value": parseFloat(drinks_discount_value.toFixed(2))
                },
                "vat_tax": {
                    "percentage": parseFloat(vat_tax.toFixed(2)),
                    "value": parseFloat(drinks_tax_value.toFixed(2))
                },
                "final_amount": parseFloat(drinks_final_amount.toFixed(2))
            }
        }

        const service_charge_value = (food_final_amount+drinks_final_amount) * parseFloat(service_charge/100);

        const generateBillData = {

            "order_id" : orderDetail.id,
            "food": {
                "sub_total" : parseFloat(food_cart_value.toFixed(2)),
                "discount": {
                    "percentage": parseFloat(food_disc.toFixed(2)),
                    "value": parseFloat(food_discount_value.toFixed(2))
                },
                "tax" : {
                    "percentage" : parseInt(gstTax),
                    "value" : parseFloat(food_tax_value.toFixed(2))
                },
                "final_amount": parseFloat(food_final_amount.toFixed(2))
            },
            "alcohol": alcoholObj,
            "service_charge" : {
                "percentage" : parseFloat(service_charge.toFixed(2)),
                "value": parseFloat(service_charge_value.toFixed(2))
            },
            "grand_total" : parseFloat((food_final_amount + drinks_final_amount + service_charge_value).toFixed(2))
        }
        return generateBillData;
    }
    const generateOrderBill = ()=>{
        RestoService.generateBill(getBillObject()).then(res=>{
            if(res.status){
                localStorage.setItem('bill_generated',true);
                setMessage(res.data.message);
                setTimeout(() => {
                    setBillModal(false);
                }, 1500);
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
                    
                    <div style={{fontWeight:'bold',fontSize:'22px',marginRight:'-15px',marginTop:'-20px',color:'red',textAlign:'right',cursor:'pointer'}}><span onClick={()=>setBillModal(false)}>X</span></div>
            <RestoName> {restaurant.name}</RestoName>
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
                        <Flex className='billHeader'><FlexItem  grow={1}>Item</FlexItem><FlexItem ><span>Qty</span></FlexItem> <FlexItem ><span>Price</span></FlexItem></Flex>

                            {
                                orderDetail.products.filter(product=>product.is_alcohol===false).length>0 
                                    ?
                                    <>
                                    <BillCategory as='h3'>Food</BillCategory>
                                    
                                    {orderDetail.products.filter(product=>product.is_alcohol===false).map(product=>{
                                            return product.qty ? (
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
                                                            <Flex column className='rightmost'>
                                                                <ProductCost>Rs.{parseInt(product.price) * product.qty}</ProductCost>
                                                            </Flex>
                                                        </FlexItem>
                                                    </Flex>
                                                </CartProduct>
                                            ) : null
                                        })
                                    }
                                    <Flex alignCenter>
                                            <FlexItem grow={1}>
                                                <SectionName>Food Subtotal</SectionName>
                                            </FlexItem>
                                            <FlexItem >
                                                <Flex column className='rightmost'>
                                                    <ProductCost>Rs.{billObject.food.sub_total}</ProductCost>
                                                </Flex>
                                            </FlexItem>
                                    </Flex>
                                    <Flex alignCenter>
                                            <FlexItem grow={1}>
                                                <SectionName>Food Discount(%) @&nbsp;&nbsp;<input type='number' style={{width:'50px'}} name='food_discount' min="0" value={foodDiscount} onChange={discountChange}/></SectionName>
                                            </FlexItem>
                                            <FlexItem >
                                                <Flex column className='rightmost'>
                                                    <ProductCost>-Rs.{parseFloat(billObject.food.discount.value)}</ProductCost>
                                                </Flex>
                                            </FlexItem>
                                    </Flex>       
                                    <Flex alignCenter>
                                            <FlexItem grow={1}>
                                                <SectionName> Gst @&nbsp;&nbsp;<input type='number' style={{width:'50px'}} name='gst_tax' value={gstTax} min="0" value={gstTax} onChange={(e)=>{setGstTax(e.target.value)} }/></SectionName>
                                            </FlexItem>
                                            <FlexItem >
                                                <Flex column className='rightmost'>
                                                    <ProductCost>+Rs.{parseFloat(billObject.food.tax.value)}</ProductCost>
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
                                            return product.qty ? (
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
                                                            <Flex column className='rightmost'>
                                                                <ProductCost>Rs.{parseFloat(product.price) * product.qty}</ProductCost>
                                                            </Flex>
                                                        </FlexItem>
                                                    </Flex>
                                                </CartProduct>
                                            ) : null
                                        })
                                        }
                                        <Flex>
                                            <FlexItem grow={1}>
                                                <SectionName>Drinks Subtotal</SectionName>
                                            </FlexItem>
                                            <FlexItem >
                                                <Flex column className='rightmost'>
                                                    <ProductCost>Rs.{billObject.alcohol.sub_total}</ProductCost>
                                                </Flex>
                                            </FlexItem>
                                        </Flex>
                                        <Flex alignCenter>
                                                <FlexItem grow={1}>
                                                    <SectionName>Drinks Discount(%) @<input type='number' min="0" style={{width:'50px'}} name='drinks_discount' value={drinksDiscount} onChange={discountChange}/></SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column className='rightmost'>
                                                        <ProductCost>-Rs.{parseFloat(billObject.alcohol.discount.value)}</ProductCost>
                                                    </Flex>
                                                </FlexItem>
                                        </Flex>
                                        <Flex alignCenter>
                                                <FlexItem grow={1}>
                                                    <SectionName>Vat(%) @<input type='number' style={{width:'50px'}} min="0" name='vat_tax' value={vatTax} onChange={(e)=>{setVatTax(e.target.value)}}/></SectionName>
                                                </FlexItem>
                                                <FlexItem >
                                                    <Flex column className='rightmost'>
                                                        <ProductCost> + Rs.{parseFloat(billObject.alcohol.vat_tax.value)}</ProductCost>
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
                            <br></br>
                            <Flex alignCenter>
                                    <FlexItem grow={1}>
                                        <SectionName>Service charge(%) @&nbsp;<input type='number' style={{width:'50px'}} min="0" name='vat_tax' value={serviceCharge} onChange={(e)=>{setServiceCharge(e.target.value)}}/></SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column className='rightmost'>
                        <ProductCost>+Rs.{parseFloat(billObject.service_charge.value)}</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex>
                            <Separator/>
                            <Flex alignCenter>
                                    <FlexItem grow={1}>
                                        <SectionName> Grand Total</SectionName>
                                    </FlexItem>
                                    <FlexItem >
                                        <Flex column className='rightmost'>
                                            <ProductCost>Rs.{parseFloat(billObject.grand_total)}</ProductCost>
                                        </Flex>
                                    </FlexItem>
                            </Flex>
                            <Separator/>
                        </PriceTable>
                        <div style={{textAlign:'center',color:'green'}}>{message}</div>
                        <SolidButton style={{position:'sticky',bottom: '0',boxShadow: '0px -10px 20px 0px rgba(0,0,0,0.2)'}}  onClick={generateOrderBill}>Generate Order Bill</SolidButton>
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
    overflow:scroll;
    .billMeta{
        font-size:1rem;
        color:#999;
    }
    .rightmost{
        margin-right: -15px;
    }
`
const SectionName= styled.div`
    font-size:1rem;font-weight:800;
    color:#444;
    margin:5px 0 ;
    
`
const BillCategory = styled.div`
    font-size:1rem;
    color:#333;
    margin:0;
`
const PriceTable = styled.div`
    padding:1rem 0;
    .billHeader{
        text-align:left;
        font-weight:800;
        span{
            width:90px;
            padding: 0 18px;
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
    color:#444;
    font-size:14px;
    width:100px;
    padding:0 10px;
    text-align:center;
    font-weight:600;
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