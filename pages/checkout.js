import React,{useState,useContext,useEffect } from 'react'
import { CartContext, AuthContext } from './_app'
import  Flex  from 'styled-flex-component';
import { StackHeader } from '../src/components/Login/LoginStyled';
import { BackIcon,RupeeIcon } from '../src/Icons';
import Router from 'next/router';
import ProductList from '../src/components/ProductList';
import styled from 'styled-components'
import productService from '../src/services/productService';
import OrderSuccessScreen from '../src/components/OrderSuccessScreen';
export default function checkout() {
    const cartContext = useContext(CartContext);
    const userContext = useContext(AuthContext);
    const [cartObject,setCartObject] = useState(null);

    const [orderSuccess, setOrderSuccess] = useState(false);
    useEffect(() => {
        
        if(cartContext.cartData.products && cartContext.cartData.products.length >0 ){ 
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
            setCartObject(null);
        }
        
    }, [cartContext.cartData.products])
    const onBack=()=>{
        Router.push(`/restaurant/${cartContext.cartData.restaurant.id}`)
    }

    const placeOrderClick = ()=>{
        const cartData = cartContext.cartData;
        const userData = userContext.authData;
        const placeOrderObject = {
            "user_id" : userData.user_id,
            "store_id" : cartData.store.id,
            "restaurant_id": cartData.restaurant.id,
            "products":cartData.products,
            "payment_method": "cod",
            "cart_amount":cartObject.cartPrice,
            "total_tax":5,
            "total_amount": ( (parseFloat(cartContext.cartData.restaurant.vat_tax) + parseFloat(cartContext.cartData.restaurant.gst_tax))*cartObject.cartPrice/100)+(cartContext.cartData.restaurant.service_charge*cartObject.cartPrice/100)+(cartObject.cartPrice),
            "payment_status": "cod"
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
        }).catch(err=>{
            console.log()
        });
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
        return null

    }
    else{
        if(orderSuccess){
            return(
                <OrderSuccessScreen goToMenu={onBack}/>
            )
        }else{
            return (
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
                    <ProductList restaurant={cartContext.cartData.restaurant} productsData={cartContext.cartData.products}/>
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
            )
        }
        
    }
}

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