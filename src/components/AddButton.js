import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
export default function AddButton(props) {
    const {product}= props;
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        // localStorage.setItem('cartData',{
        //     products:[]
        // })
        // let products = [];
        const cartData = JSON.parse(window.localStorage.getItem('cartData'));
        let cart_quantity = 0
        if(cartData){
            if(cartData.products.filter(pro=>pro.id===product.id).length){
                cartData.products.forEach(cartProduct => {
                    if(product.id === cartProduct.id){
                        cart_quantity = cartProduct.quantity;
                    }  
                })
            }
        }
        setQuantity(cart_quantity);
    }, [])
    const addProduct = (e)=>{
        const cartData = JSON.parse(window.localStorage.getItem('cartData'));
        if(cartData){
            if(cartData.products.filter(pro=>pro.id===product.id).length){
                cartData.products.forEach((cartProduct,index) => {
                    if(product.id === cartProduct.id){
                        const splicedData = cartData.products.splice(index,1);
                        const data = {
                            ...cartData,
                            products:[
                                ...cartData.products,{
                                ...product,
                                quantity:cartProduct.quantity + 1
                            }]
                        }
                        window.localStorage.setItem('cartData',JSON.stringify(data));
                        setQuantity(cartProduct.quantity + 1);
                    }
                });
                
            }else{
                const data = {
                    ...cartData,
                    products:[...cartData.products,{
                        ...product,
                        quantity
                    }]
                    
                }
                window.localStorage.setItem('cartData',JSON.stringify(data));
                 setQuantity(1);
            }
            
        }else{
            
            const data = {
                products:[
                    {
                        ...product,
                        quantity:1
                    }
                ]
            }
            window.localStorage.setItem('cartData',JSON.stringify(data));
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
                        window.localStorage.setItem('cartData',JSON.stringify(data));
                        setQuantity(0 );

                    }else{
                        const splicedData = cartData.products.splice(index,1);
                        const data = {
                            ...cartData,
                            products:[
                                ...cartData.products,{
                                ...product,
                                quantity:cartProduct.quantity - 1
                            }]
                        }
                        window.localStorage.setItem('cartData',JSON.stringify(data));
                        setQuantity(cartProduct.quantity - 1);
                    }
                    
                }
            });
            
        }
    }
    return (
        quantity>0
        ?
        <Button >
           <RemoveProduct onClick={removeProduct}> -</RemoveProduct>
            {quantity}
            <IncrementProduct onClick={addProduct}>+</IncrementProduct>
        </Button>
        :
        <Button onClick={addProduct}>
            Add
        </Button>
    )
}



const Button = styled.div`
    border-radius:5px;
    background:#f6192b;
    padding:0.25rem 0.8rem;
    color:#ffffff;
    font-size:12px;
    font-weight:800;
    display:flex;
`

const RemoveProduct = styled.div`
    width:20px;
    text-align:left;
`
const IncrementProduct= styled.div`
    width:20px;
    text-align:right;
`