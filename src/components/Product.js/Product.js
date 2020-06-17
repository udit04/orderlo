import React from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { RupeeIcon } from '../../Icons';
export default function Product(props) {
    const {data,restaurant} = props;
    console.log(restaurant);
    return (
        <ProductWrapper>
            <img src='https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/2019_df_retail_butter-burger_20912_760x580.jpg?ext=.jpg'/>
            <ProductName>{data.name}</ProductName>
    <RestaurentName>{restaurant.name}</RestaurentName>
            <Flex alignCenter justifyBetween>
    <LocationName><RupeeIcon height={10} width={10}/>{data.price}</LocationName> <AddButton>Add</AddButton>
            </Flex>
        </ProductWrapper>
    )
}

const ProductWrapper = styled.div`
    
    width: calc(50% - 4rem);
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
const AddButton = styled.div`
    border-radius:5px;
    background:#f6192b;
    padding:0.25rem 0.8rem;
    color:#ffffff;
    font-size:12px;
    font-weight:800;
`