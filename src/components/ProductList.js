import React from 'react'
import Product from './Product.js/Product';
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
        return (
        <ProductContainer>
            <Flex column >
                {props.productsData.map(data=><Product restaurant={props.restaurant} data={data}/>)}
                {/* <Product/> */}
            </Flex>
        </ProductContainer>    
        )
    }
}


const ProductContainer = styled.div`
    background:#fff;
    min-height: calc(100vh - 200px);
    padding-bottom: 4rem;
`;