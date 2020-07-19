import React from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { RupeeIcon } from '../../Icons';
import { IsVeg } from '../IsVeg';
import AddButton,{AddButtonDashboard} from '../AddButton';
export default function Product(props) {
    const {data,restaurant,noImage} = props;
    if(!data) return <React.Fragment></React.Fragment>
    return (
        <Wrapper>
            {!noImage && <img src={data.image}/>}
            <ProductContent>
                <Flex column>
                    <ProductName>{data.name} <IsVeg is_veg={data.is_veg}/></ProductName>
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

export function DashboardProduct(props){
    const {data,restaurant,noImage,onRemove,onAdd} = props;
    if(!data) return <React.Fragment></React.Fragment>
    return (
        <Wrapper>
            {!noImage && <img src={data.image}/>}
            <ProductContent>
                <Flex column>
                    <ProductName>{data.name} <IsVeg is_veg={data.is_veg}/></ProductName>
                    <RestaurentName>{restaurant.name} </RestaurentName>
                    <LocationName><RupeeIcon color={'#f1a62d'} height={8} width={8}/>{data.price}</LocationName>
    
                </Flex>
                {!props.dashboard
                ?
                <Flex alignCenter justifyBetween>
                    <AddButtonDashboard quantity={data.qty} onAdd={onAdd} onRemove={onRemove} restaurant={restaurant} product={data}></AddButtonDashboard>
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
    font-size:12px;
    font-weight:500;
    line-height: 1;
    @media screen and (min-width:600px){
        font-size:16px;
    }
`
const RestaurentName = styled.div`
    font-size:10px;
    color:#aaa;
`
const LocationName = styled.div`
    font-size:12px;
    color:#f1a62d;
    font-weight:800;
    margin-top: 5px;
`
