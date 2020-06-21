import React from 'react'
import Product from './Product.js/Product';
import styled from 'styled-components';
import Flex  from 'styled-flex-component';
import RestoCard from './Resto/RestoCard';
import SkeletonLoader from './SkeletonLoader';

export default function RestoList(props) {
    if(!(props.store  && props.restaurantsData)){
       return  <SkeletonLoader screen='mobile' />
    }
    else {
        return (
        <ProductContainer>
            <Flex wrap >
                {props.restaurantsData.map(data=><RestoCard store={props.store} data={data}/>)}
                {/* <Product/> */}
            </Flex>
        </ProductContainer>    
        )
    }
}


const ProductContainer = styled.div`
    background:#fff;
    min-height: 100vh;
`;

const LoaderWrapper = styled.div`
    background:#fff;
    min-height: 100vh;
`