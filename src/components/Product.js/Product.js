import React from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { RupeeIcon } from '../../Icons';
import { IsVeg } from '../IsVeg';
import AddButton from '../AddButton';
export default function Product(props) {
    const {data,restaurant} = props;
    if(!data) return <React.Fragment></React.Fragment>
    return (
        <Wrapper>
            <img src={data.image}/>
            <ProductContent>
                <Flex column>
                    <ProductName><IsVeg is_veg={data.is_veg}/> {data.name} </ProductName>
                    <RestaurentName>{restaurant.name} </RestaurentName>
                    <LocationName><RupeeIcon color={'#f1a62d'} height={8} width={8}/>{data.price}</LocationName>
                
                </Flex>
                {!props.dashboard
                ?
                <Flex alignCenter justifyBetween>
                    <AddButton restaurant={restaurant} product={data}></AddButton>
                </Flex>
                :
                ''
                }
            </ProductContent>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    width: auto;
    margin: 1rem;
    img{
        border-radius:5px;
        width:50px;
        height:50px;
    }

`
const ProductContent = styled.div`
    flex:1;
    display: flex;
    justify-content: space-between;
    padding-left: 0.5rem;
    align-items: flex-start;
`
const ProductName = styled.div`
    color:#333333;
    font-size:16px;
    font-weight:500;
    line-height: 1;
    @media screen and (min-width:600px){
        font-size:16px;
    }
`
const RestaurentName = styled.div`
    font-size:12px;
    color:#aaa;
`
const LocationName = styled.div`
    font-size:14px;
    color:#f1a62d;
    font-weight:800;
    /* margin-top: 5px; */
`
