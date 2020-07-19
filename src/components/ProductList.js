import React from 'react'
import Product,{DashboardProduct} from './Product.js/Product';
import styled from 'styled-components';
import Flex  from 'styled-flex-component';
import SkeletonLoader from './SkeletonLoader';

export default function ProductList(props) {
    if(!(props.productsData  && props.restaurant)){
       return (
           <SkeletonLoader screen='mobile'/>
       )
    }
    else {
        if(props.search && props.search.length>0 ){
            return (
                <ProductContainer className={props.className?props.className:''}>
                    <Flex column >
                        {props.productsData.filter(p=>(p.name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1)).map(data=><Product dashboard={props.dashboard} restaurant={props.restaurant} data={data}/>)}
                        {/* <Product/> */}
                    </Flex>
                </ProductContainer>  
            )  
        }else{
            return (
                <ProductContainer className={props.className?props.className:''}>
                    <Flex column >
                        {props.productsData.map(data=><Product dashboard={props.dashboard} restaurant={props.restaurant} data={data}/>)}
                        {/* <Product/> */}
                    </Flex>
                </ProductContainer>    
            )
        }
       
    }
}

export function ProductListDashboard(props) {
    const {onAdd,onRemove} = props;
    if(!(props.productsData  && props.restaurant)){
       return (
           <SkeletonLoader screen='mobile'/>
       )
    }
    else {
        if(props.search && props.search.length>0 ){
            return (
                <ProductContainer className={props.className?props.className:''}>
                    <Flex column >
                        {props.productsData.filter(p=>(p.name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1)).map(data=><DashboardProduct noImage dashboard={props.dashboard} restaurant={props.restaurant} data={data}/>)}
                        {/* <Product/> */}
                    </Flex>
                </ProductContainer>  
            )  
        }else{
            return (
                <ProductContainer className={props.className?props.className:''}>
                    <Flex column >
                        {props.productsData.map(data=><DashboardProduct noImage quantity={data.qty} onAdd={onAdd} onRemove={onRemove} dashboard={props.dashboard} restaurant={props.restaurant} data={data}/>)}
                        {/* <Product/> */}
                    </Flex>
                </ProductContainer>    
                )
        }
       
    }
}

const ProductContainer = styled.div`
    background:#fff;
    background: #fff;
    &.cartProducts{
        height: calc(100vh - 250px);
        overflow-y: scroll;
    }
    &:last-child{
        padding-bottom:4rem;
    }
    /* min-height: calc(100vh - 200px); */
    /* padding-bottom: 4rem; */
`;