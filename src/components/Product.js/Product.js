import React from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { RupeeIcon } from '../../Icons';
import { IsVeg } from '../IsVeg';
import AddButton from '../AddButton';
export default function Product(props) {
    const {data,restaurant} = props;
    console.log(restaurant);
    return (
        <Wrapper>
            <img src={data.image}/>
            <ProductName>{data.name} <IsVeg is_veg={data.is_veg}/></ProductName>
                <RestaurentName>{restaurant.name} </RestaurentName>
            <Flex alignCenter justifyBetween>
                <LocationName><RupeeIcon height={10} width={10}/>{data.price}</LocationName> <AddButton product={data}></AddButton>
            </Flex>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    
    width: calc(50% - 2rem);
    margin: 1rem;
    img{
        border-radius:10px;
        width:100%;
        height:auto;
    }

`
const ProductName = styled.div`
    color:#333333;
    font-size:12px;
    font-weight:700;
`
const RestaurentName = styled.div`
    font-size:13px;
    color:#999999;
`
const LocationName = styled.div`
    font-size:14px;
    color:#333333;
    font-weight:800;
`
