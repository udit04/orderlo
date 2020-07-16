import React,{useState,useContext,useEffect } from 'react'
import { CartContext, AuthContext } from './_app'
import  Flex  from 'styled-flex-component';
import { StackHeader, TextInputWrapper,TextInput, SolidButton } from '../src/components/Login/LoginStyled';
import { BackIcon,RupeeIcon, CloseIcon } from '../src/Icons';
import Router from 'next/router';
import ProductList from '../src/components/ProductList';
import styled from 'styled-components'
import productService from '../src/services/productService';
import OrderSuccessScreen from '../src/components/OrderSuccessScreen';
import LoginSignup from '../src/components/Login/LoginSignup';
export default function checkout() {
    const cartContext = useContext(CartContext);
    const userContext = useContext(AuthContext);
    const [cartObject,setCartObject] = useState(null);

    const [orderSuccess, setOrderSuccess] = useState(false);
    const [loginPopup,setLoginPopup] = useState(false);
    const [tableModal,setTableModal] = useState(false);
    const [table,setTable] = useState('');
    useEffect(() => {
        
        if(cartContext.cartData && cartContext.cartData.products && cartContext.cartData.products.length >0 ){ 
            
            let cartQuantity = 0;
            let cartPrice = 0;
            cartContext.cartData.products.forEach(element => {
            cartQuantity += element.quantity;
            cartPrice += element.quantity*element.price;
            });
            console.log(cartQuantity,cartPrice);
            if((cartQuantity>0 && cartPrice>0)){
                console.log(cartContext.cartData.products);
                setCartObject(()=>{return{itemsCount:cartQuantity,cartPrice:cartPrice}});
            }else{
                console.log(cartContext.cartData.products,'___');
            }
        
        }else{
            if(cartContext.cartData && cartContext.cartData.restaurant ){
                setCartObject(null);
                Router.push('/restaurant/'+cartContext.cartData.restaurant.id);
            }
        }
        
    }, [cartContext.cartData && cartContext.cartData.products])
    const onBack=()=>{
        Router.push(`/restaurant/${cartContext.cartData.restaurant.id}`)
    }

    const placeOrderClick = ()=>{
        const cartData = cartContext.cartData;
        const authData = userContext.authData;
        if(table!==''){
            if(cartData && authData.userData && authData.userData.user_id){

                const placeOrderObject = {
                    "user_id" : authData.userData && authData.userData.user_id?authData.userData.user_id:null,
                    "store_id" : cartData && cartData.store && cartData.store.id?cartData.store.id:null,
                    "restaurant_id": cartData.restaurant.id,
                    "products":cartData.products,
                    "payment_method": "cod",
                    "order_status": "created",
                    "cart_amount":cartObject.cartPrice,
                    "total_tax":5,
                    "total_amount": ( (parseFloat(cartContext.cartData.restaurant.vat_tax) + parseFloat(cartContext.cartData.restaurant.gst_tax))*cartObject.cartPrice/100)+(cartContext.cartData.restaurant.service_charge*cartObject.cartPrice/100)+(cartObject.cartPrice),
                    "discount": 0,
                    "table_no": table
                }
                productService.placeOrder(placeOrderObject).then(res=>{
                    if(res.status===200){
                        
                        setOrderSuccess(true);
                        const updatedCartData = {
                            ...cartContext.cartData,
                            products:[]
                        }
                        window.localStorage.setItem('cartData',JSON.stringify(updatedCartData))
                        
                    }
                }) .catch(err=>{
                    console.log()
                });
            }else{
                setLoginPopup(true);
            }
        }else{
            setTableModal(true);
        }
        
       
    }
    const clearCartAndRedirect = ()=>{
        onBack();
        cartContext.setCartData(updatedCartData);
    }
    
    if(!cartObject ){
        if(cartContext.cartData && cartContext.cartData.restaurant && !cartContext.cartData.products.length){

            Router.push(`/restaurant/${cartContext.cartData.restaurant.id}`)
            
        }else{
        }
        return <div></div>

    }
    else{
        if(orderSuccess){
            return(
                <OrderSuccessScreen goToMenu={onBack}/>
            )
        }else{
            return (
                <React.Fragment>
                   { loginPopup && <LoginSignup placeOrderClick={placeOrderClick} setLoginPopup={setLoginPopup} /> }
                <Flex column>
                    <StackHeader>
                        <Flex justifyBetween alignCenter>
                            <div>
                            <BackIcon onClick={onBack}  height={20} width={20}/> 
                                Cart
                            </div>
                            <div>
                            {cartObject.itemsCount} Items
                            </div>
                            {/* <ShareIcon height={20} width={20}/> */}
                        </Flex>
                    </StackHeader>
                    <ProductList className='cartProducts' restaurant={cartContext.cartData.restaurant} productsData={cartContext.cartData.products}/>
                    <CartBillWrapper>
                        
                        <CartTotal><span>Cart Total</span> <span> <RupeeIcon color={'#333'} height={12} width={12}/> {cartObject.cartPrice}</span></CartTotal>
                        <Tax><span>Service Charge</span> <span><RupeeIcon color={'#999'} height={8} width={8}/>{cartContext.cartData.restaurant.service_charge*cartObject.cartPrice/100}</span></Tax>
                        <Tax><span>Taxes and charges</span> <span><RupeeIcon color={'#999'} height={8} width={8}/>{(parseFloat(cartContext.cartData.restaurant.vat_tax) + parseFloat(cartContext.cartData.restaurant.gst_tax))*cartObject.cartPrice/100}</span></Tax>
                    </CartBillWrapper>
                    <FinalPayAmount id='payButton'>
                    <span>To Pay</span> <span><RupeeIcon color={'#f1a62d'} height={8} width={8}/>{((parseFloat(cartContext.cartData.restaurant.vat_tax) + parseFloat(cartContext.cartData.restaurant.gst_tax))*cartObject.cartPrice/100)+(cartContext.cartData.restaurant.service_charge*cartObject.cartPrice/100)+(cartObject.cartPrice)}</span>
                    </FinalPayAmount>
                    <ProceedToPay  onClick={placeOrderClick}>Proceed to pay <span><RupeeIcon  height={8} width={8}/>{((parseFloat(cartContext.cartData.restaurant.vat_tax) + parseFloat(cartContext.cartData.restaurant.gst_tax))*cartObject.cartPrice/100)+(cartContext.cartData.restaurant.service_charge*cartObject.cartPrice/100)+(cartObject.cartPrice)}</span></ProceedToPay>
                </Flex>
               {    
                    tableModal
                        &&
                    <TableNoModal>
                        <CloseIcon color={'#000'} onClick={()=>{setTableModal(false)}} height={20} width={20} style={{position:'absolute',top:'20px',right:'20px'}}/>
                        <div>
                            <p>Enter table number</p>
                            <TextInputWrapper>
                                <TextInput type='number'  value={table} placeholder='Enter table number' name='table_number' onChange={(e)=>{setTable(e.target.value)}}>
                                </TextInput>
                            </TextInputWrapper>
                            <SolidButton disabled={table===''} onClick={()=>{placeOrderClick();}}>Proceed</SolidButton>
                        </div>
                    </TableNoModal>
               }
                </React.Fragment>
            )
        }
        
    }
}
const TableNoModal = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    background:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    bottom:0;
    padding:2rem;
`

const CartTotal = styled.div`
    color:#333;
    font-size:1rem;
    display:flex;
    justify-content:space-between;

`
const CartBillWrapper = styled.div`
    padding:1rem;
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;

`

const Tax = styled.div`
    font-size: 12px;
    color:#999;
    display:flex;
    justify-content:space-between;
`
const FinalPayAmount = styled.div`
    padding:1rem;
    font-weight:700;
    display:flex;
    justify-content:space-between;
    color:#f1a62d;
`

const ProceedToPay = styled.div`
    background:#f1a62d;
    color:#ffffff;
    font-weight:700;
    text-align:center;
    padding:1rem;
    text-transform:capitalise;
    display: block;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
`