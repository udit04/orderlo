import React from 'react'
import styled from 'styled-components'
import { SolidButton } from '../Login/LoginStyled';
import Flex from 'styled-flex-component'
function CreateCategory({data,setCategoryDetails,setProductModal,setModal}) {
    const editCategoryClick = ()=>{
        setModal(true)
        setCategoryDetails(data);
        // setEditCategory();
    }
    return (
        <Category style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
            <Flex justifyBetween alignCenter>
            {data.name} 
            <Flex>
                <SolidButton onClick={editCategoryClick} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add SubCategory</SolidButton>
                <SolidButton onClick={()=>{setProductModal(true)}}  style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add Item</SolidButton>
            </Flex>
            </Flex>
        </Category>
    )
}

const Category = styled.div`
    padding:1rem;
    /* border-radius:5px; */
    width:100%;
    display:block;
    border-bottom:1px solid #c5c5c5;
`;
export default CreateCategory
