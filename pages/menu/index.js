import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { SolidButton, TextInputWrapper, TextInput } from '../../src/components/Login/LoginStyled'
import StyledModal from '../../src/components/Modal/StyledModal'
import Router from 'next/router';
import menuService from '../../src/services/menuService'

function CreateMenu() {
    const modalRef = React.createRef();
    const productModalRef = React.createRef();
    const [productModal, setProductModal] = useState(false)
    const [modal, setModal] = useState(false)
    const [restoDetail,setRestoDetail] = useState(null);
    const [category,setCategory] = useState({name:'',desc:''});
    const [categoryDetails,setCategoryDetails] = useState(null);
    const [categories,setCategories] = useState([]);

    const openCategoryModal = (data)=>{
        setCategoryDetails();
        setModal(true) 
    }

    useEffect(() => {
        const restoDetail = JSON.parse(localStorage.getItem('restoDetail'));
        if(restoDetail){
            setRestoDetail(restoDetail.restaurant);
            console.log('restoDetail',restoDetail);
            fetchCategories(restoDetail.restaurant.id);
        }else{
            Router.push('/restologin')
        }
    }, [])
    const onCloseModal = ()=>{
        setCategoryName('');
        setCategoryDesc('');
        setModal(false)
    }

    const fetchCategories = (id)=>{
        menuService.fetchCategories({restaurant_id: id}).then(res=>{
            setCategories(res.data.data);
        }).catch(err=>{})
    }

    const saveCategory = ()=>{
        menuService.createCategory({
                "name" : category.name,
                "description": category.desc,
                "restaurant_id": restoDetail.id,
                "tags": null,
        }).then(res=>{
            setModal(false);
            fetchCategories(restoDetail.id);
        }).catch(err=>{
            setModal(false);
        })
    }
    return (
        <CategoryWrapper>
            <CategoryList >
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
    padding: 5rem 0;
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