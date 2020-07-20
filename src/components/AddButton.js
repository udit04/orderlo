import React,{useState,useEffect,useContext} from 'react'
import styled from 'styled-components'
import  Flex  from 'styled-flex-component';
import { CartContext } from '../../pages/_app';
export default function AddButton(props) {
    const {product,restaurant}= props;
    const [quantity, setQuantity] = useState(0);
    const cartContext  = useContext(CartContext);
    useEffect(() => {
        // localStorage.setItem('cartData',{
        //     products:[]
        // })
        // let products = [];
        const cartData = cartContext.cartData
        let cart_quantity = 0
        if(cartData && cartData.products){
            if(cartData.products.filter(pro=>pro.id===product.id).length){
                cartData.products.forEach(cartProduct => {
                    if(product.id === cartProduct.id){
                        cart_quantity = cartProduct.quantity;
                    }  
                })
            }
        }
        setQuantity(cart_quantity);
    }, [cartContext.cartData])
    const addProduct = (e)=>{
        const cartData = JSON.parse(window.localStorage.getItem('cartData'));
        if(cartData && cartData.products){
            if(cartData.products.filter(pro=>pro.id===product.id).length>0){
                cartData.products.forEach((cartProduct,index) => {
                    if(product.id === cartProduct.id){
                        const splicedData = cartData.products.splice(index,1,{
                            ...product,
                            quantity:cartProduct.quantity + 1
                        });
                        const data = {
                            ...cartData,
                            products:[...cartData.products]
                        }
                        
                        
                        window.localStorage.setItem('cartData',JSON.stringify(data));
                        setQuantity(cartProduct.quantity + 1);
                        cartContext.setCartData(data);
                        
                    }
                });
                
            }else{
                const data = {
                    ...cartData,
                    products:[...cartData.products,{
                        ...product,
                        quantity:1
                    }]
                    
                }
                
                window.localStorage.setItem('cartData',JSON.stringify(data));
                setQuantity(1);
                cartContext.setCartData(data);
                 
            }
            
        }else{
            let data ={}
            if(cartData && !cartData.products){

                 data = {
                    ...cartData,
                    restaurant:{...restaurant},
                    products:[
                        {
                            ...product,
                            quantity:1
                        }
                    ],

                }
                
                
            }else if(!cartData){
                data = {
                    restaurant:{...restaurant},
                    products:[
                        {
                            ...product,
                            quantity:1
                        }
                    ],
                }
            }
                window.localStorage.setItem('cartData',JSON.stringify(data));
                cartContext.setCartData(data);
                setQuantity(1)

        }
    }
    const removeProduct = (e)=>{
        const cartData = JSON.parse(window.localStorage.getItem('cartData'));

        if(cartData.products.filter(pro=>pro.id===product.id).length){

            cartData.products.forEach((cartProduct,index) => {

                if(product.id === cartProduct.id){
                    if(cartProduct.quantity <2){
                        const splicedData = cartData.products.splice(index,1);
                        const data = {
                            ...cartData,
                            products:[
                                ...cartData.products
                            ]
                        }
                        cartContext.setCartData(data);
                        window.localStorage.setItem('cartData',JSON.stringify(data));
                        setQuantity(0 );

                    }else{
                        const splicedData = cartData.products.splice(index,1,{
                            ...product,
                            quantity:cartProduct.quantity - 1
                        });
                        const data = {
                            ...cartData,
                            products:[...cartData.products]
                        }
                        
                        window.localStorage.setItem('cartData',JSON.stringify(data));
                        cartContext.setCartData(data);
                        setQuantity(cartProduct.quantity - 1);
                    }
                    
                }
            });
            
        }
    }
    return (
        quantity>0
        ?
        <Flex >
           <RemoveProduct onClick={removeProduct}> -</RemoveProduct>
           <QuantityCount>{quantity}</QuantityCount>
            <IncrementProduct onClick={addProduct}>+</IncrementProduct>
        </Flex>
        :
        <Button onClick={addProduct}>
            Add
        </Button>
    )
}


export function AddButtonDashboard(props) {
    const {onAdd,onRemove,quantity,product} = props;
    return (
        quantity>0
        ?
        <Flex >
           <RemoveProduct onClick={()=>onRemove(product)}> -</RemoveProduct>
           <QuantityCount>{quantity}</QuantityCount>
            <IncrementProduct onClick={()=>onAdd(product)}>+</IncrementProduct>
        </Flex>
        :
        <Button onClick={()=>onAdd(product)}>
            Add
        </Button>
    )
}


const Button = styled.div`
    border-radius:5px;
    background:#f1a62d;
    padding:0.25rem 1rem;
    color:#ffffff;
    font-size:14px;
    font-weight:800;
    display:flex;
`

const RemoveProduct = styled.div`
    width:20px;
    height:20px;
    background:#f1a62d;
    border-radius:10px;
    text-align:left;
    /* padding: 5px 10px; */
    text-align: center;
    color:#fff;
    font-weight:800;

`
const QuantityCount = styled.div`
    min-width: 20px;
    height: 20px;
    /* padding: 5px; */
    text-align: center;
    color: #333;
`
const IncrementProduct= styled.div`
    width:20px;
    height:20px;
    background:#f1a62d;
    border-radius:10px;
    background:#f1a62d;
    /* padding: 5px 10px; */
    text-align: center;
    font-weight:800;

    color:#fff;
`