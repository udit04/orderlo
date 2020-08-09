import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { SolidButton, TextInputWrapper, TextInput } from '../../../src/components/Login/LoginStyled'
import StyledModal from '../../../src/components/Modal/StyledModal'
import Router from 'next/router';
import menuService from '../../../src/services/menuService'

function Category() {
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
            <div style={{textAlign:'right',margin:'10px'}}><button onClick={()=>Router.push(`/dashboard/${restoDetail.id}`)} style={{background: 'cadetblue',borderRadius: "10px",padding: "10px"}}>Back To Dashboard</button></div>
            <Flex column alignCenter>
                <Flex>
                <SolidButton onClick={openCategoryModal} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add Category</SolidButton>
                </Flex>
                {categories.map((cat,i)=>(<CreateCategory setProductModal={setProductModal} setCategoryDetails={setCategoryDetails} setModal={setModal} data={cat} key={i}/>))}
            </Flex>
            </CategoryList>
            {   modal &&
                <StyledModal contentRef={modalRef} onClose={()=>{setModal(false)}}>
                    <ModalContent ref={modalRef}>
                        <h3>Create Category</h3>
                        <TextInputWrapper>
                            <TextInput placeholder='Category name' value={category.name} onChange={(e)=>setCategory({name:e.target.value, desc: category.desc})}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                        <TextInput placeholder='Category description' value={category.desc} onChange={(e)=>setCategory({name: category.name,desc:e.target.value})}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <SolidButton onClick={saveCategory}> Save</SolidButton>
                        </TextInputWrapper>
                    </ModalContent>
                </StyledModal>
            }
            {   productModal &&
                <StyledModal contentRef={productModalRef} onClose={()=>{setProductModal(false)}}>
                    <ModalContent ref={productModalRef}>
                        <h3>Create Category</h3>
                        <TextInputWrapper>
                            <TextInput placeholder='Category name' value={''}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                        <TextInput placeholder='Category description'></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                        <TextInput placeholder='Price' onChange={(e)=>{}}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                        <TextInput placeholder='Category description'></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <SolidButton onClick={saveProduct}> Save</SolidButton>
                        </TextInputWrapper>
                    </ModalContent>
                </StyledModal>
            }
        </CategoryWrapper>
    )
}

function CreateCategory({data,setCategoryDetails,setProductModal,setModal}) {
    const addSubCategoryClick = ()=>{
        Router.push(`/menu/subcategory?category_id=${data.id}&category_name=${data.name}&from=category`);
    }

    const addItemClick = ()=>{
        Router.push(`/menu/products?c_id=${data.id}&c_name=${data.name}&from=category`);
    }

    return (
        <CategoryComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
            <Flex justifyBetween alignCenter>
            {data.name} 
            <Flex>
                <SolidButton onClick={addSubCategoryClick} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add SubCategory</SolidButton>
                <SolidButton onClick={addItemClick}  style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add Item</SolidButton>
            </Flex>
            </Flex>
        </CategoryComp>
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

export default Category