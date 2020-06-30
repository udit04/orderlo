import React,{useContext,useEffect,useState} from 'react'
import styled from 'styled-components'
import { CartIcon, AccountIcon, RupeeIcon } from '../Icons'
import { CartContext } from '../../pages/_app';
import Flex from 'styled-flex-component'
import  Router  from 'next/router';
import  Link  from 'next/link';
export default function BottomTab() {
    const cartContext = useContext(CartContext);
    const [cartObject,setCartObject] = useState(null);
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
        console.log(cartContext.cartData);
        
    }, [cartContext.cartData])

    const proceedToCheckout=()=>{
        Router.push('/checkout');
    }
    if(!cartObject){
        return null
    }
    else{
        return (
            <TabContainer>
                {/* <TabButton>
                    <AccountIcon height={20} width={20} />
                </TabButton>
                <TabButton>
                    <AccountIcon height={20} width={20} />
                </TabButton>
                <TabButton>
                    <CartIcon height={20} width={20}/>
                </TabButton> */}
                <ItemsWrapper> <Flex column><div>Total Items</div><div>{cartObject.itemsCount}</div> </Flex></ItemsWrapper>
                 <PriceWrapper> <RupeeIcon height={12} width={12}/>{cartObject.cartPrice}</PriceWrapper>
                <CheckoutBtn >
                    <Link href="/checkout#payButton" scroll={false}>
                    Checkout
                    </Link>
                    </CheckoutBtn>
                
            </TabContainer>
        )
    }
}

// const TabButton = styled.div`
//     background: #7689f5;
//     height: 40px;
//     width: 40px;
//     border-radius: 20px;
//     padding: 10px;
// `;


const TabContainer = styled.div`
    display:flex;
    justify-content:space-evenly;
    position:fixed;
    width:80%;
    bottom:0;
    left:50%;
    transform:translateX(-50%);
    z-index:1000;
    background:#3e4daf;
    border-radius: 10px 10px 0 0 ;
    padding:0.5rem;
    text-align:center;
    align-items:center;
    justify-content: space-between;
    /* padding: 0.5rem 1rem; */
    padding:1rem;

`

const ItemsWrapper = styled.div`
    color:#f1a62d;
    line-height:1;
`
const PriceWrapper = styled.div`
    color:#fff;
    font-size:1rem;

`;
const CheckoutBtn = styled.div`
    color:#f1a62d;
    font-size:1rem;
    a{
        color:#f1a62d;
        text-decoration:none;
    }
`