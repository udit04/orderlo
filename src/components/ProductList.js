import React from 'react'
import Product from './Product.js/Product';
import styled from 'styled-components';
import Flex  from 'styled-flex-component';

export default function ProductList(props) {
    if(!(props.productsData  && props.restaurant)){
       return  <div>...Loading</div>
    }
    else {
        return (
        <ProductContainer>
            <Flex wrap justifyCenter>
                {props.productsData.map(data=><Product restaurant={props.restaurant} data={data}/>)}
                {/* <Product/> */}
            </Flex>
        </ProductContainer>    
        )
    }
}


const ProductContainer = styled.div`
    background:#fff;
`;