import React from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import Link from 'next/link'
export default function RestoCard(props) {
    const {data,store} = props;
    return (
        <Wrapper>
            <Link href="/restaurant/[store_id]" as={`/restaurant/${data.id}`}>
                <img src={data.image}/>
            </Link>
            <ProductName>{data.name}</ProductName>
            <RestaurentName>{store.name}</RestaurentName>
            
        </Wrapper>
       
    )
}


const Wrapper = styled.div`
    
    width: calc(50% - 6rem);
    margin: 1.5rem;
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