import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { SolidButton } from '../../src/components/Login/LoginStyled'
import Router from 'next/router';

function CreateMenu() {
    const [restoDetail,setRestoDetail] = useState(null);

    const openCategoryModal = (data)=>{
        setModal(true) 
    }

    useEffect(() => {
        const restoDetail = JSON.parse(localStorage.getItem('restoDetail'));
        if(restoDetail){
            setRestoDetail(restoDetail.restaurant);
        }else{
            Router.push('/restologin')
        }
    }, []);
    return (
        <CategoryWrapper>
            <CategoryList >
            <div style={{textAlign:'right',margin:'10px'}}><button onClick={()=>Router.push(`/dashboard/${restoDetail.id}`)} style={{background: 'cadetblue',borderRadius: "10px",padding: "10px"}}>Back To Dashboard</button></div>
            <Flex column alignCenter>
                <Flex>
                <SolidButton onClick={()=>Router.push('/menu/category')} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'10px'}}>Categories</SolidButton>
                <SolidButton onClick={()=>Router.push('/menu/products')} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'10px'}}>Products</SolidButton>
                </Flex>
            </Flex>
            </CategoryList>
        </CategoryWrapper>
    )
}

const CategoryWrapper = styled.div`
    background:#f5f5f5;
    min-height:100vh;
`;
const CategoryList = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 2rem 0;
    background: #fff;
`
const ModalContent = styled.div`
    background: #fff;
    border-radius:20px;
    padding:2rem;
    height:500px;
    overflow:scroll;
    width:100%;
    max-width:600px;
`
const CategoryComp = styled.div`
    padding:1rem;
    width:100%;
    display:block;
    border-bottom:1px solid #c5c5c5;
`;

export default CreateMenu