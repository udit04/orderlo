import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import CreateCategory from '../src/components/StoreMenu/CreateCategory'
import Flex from 'styled-flex-component'
import { SolidButton, TextInputWrapper, TextInput } from '../src/components/Login/LoginStyled'
import StyledModal from '../src/components/Modal/StyledModal'
import { Router } from 'next/router';
import menuService from '../src/services/menuService'

const categories = [{name:'Category 1'},{name:'Category 2'},{name:'Category 3'},{name:'Category 4'},{name:'Category 5'},{name:'Category 6'}]

function CreateMenu() {
    const modalRef = React.createRef();
    const productModalRef = React.createRef();
    const [productModal, setProductModal] = useState(false)
    const [modal, setModal] = useState(false)
    const [restoDetail,setRestoDetail] = useState(null);
    const [categoryName,setCategoryName] = useState('');
    const [categoryDesc,setCategoryDesc] = useState('');
    const [categoryDetails,setCategoryDetails] = useState(null);
    const openCategoryModal = (data)=>{
        setCategoryDetails();
        setModal(true)
        
    }

    useEffect(() => {
        const restoDetail = JSON.parse(localStorage.getItem('restoDetail'));
        if(restoDetail){
            setRestoDetail(restoDetail);
        }else{
            Router.push('/restologin')
        }
    }, [])
    const onCloseModal = ()=>{
        setCategoryName('');
        setCategoryDesc('');
        setModal(false)
    }
    const saveCategory = ()=>{
        menuService.createCategory({
                "name" : categoryName,
                "description": categoryDesc,
                "category_id": 1,
                "restaurant_id": restoDetail.id,
                "tags": null,
                "is_active": true
        }).then(res=>{
            setModal(false);
        }).catch(err=>{
            setModal(false);
        })
    }
    const editCategoryClick = (data)=>{
        setCategoryDetails(data);
    }
    const saveProduct = (data)=>{
        const saveCategory = ()=>{
            menuService.createCategory({
                    "name": "Espresso",
                    "price": 80,
                    "restaurant_id": restoDetail.id,
                    "is_veg": true,
                    "image": "https://i.imgur.com/8BlC9qK.jpg",
                    "category_id": 2,
                    "subcategory_id": null,
                    "is_alcohol": false
            }).then(res=>{
                setModal(false);
            }).catch(err=>{
                setModal(false);
            })
        }
    }
    return (
        <CategoryWrapper>
            <CategoryList >
            <Flex column alignCenter>
                <Flex>
                <SolidButton onClick={openCategoryModal} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add Category</SolidButton>
                </Flex>
                {categories.map(cat=>(<CreateCategory setProductModal={setProductModal} setCategoryDetails={setCategoryDetails} setModal={setModal}  data={cat}/>))}
            </Flex>
            </CategoryList>
            {   modal &&
                <StyledModal contentRef={modalRef} onClose={()=>{setModal(false)}}>
                    <ModalContent ref={modalRef}>
                        <h3>Create Category</h3>
                        <TextInputWrapper>
                            <TextInput placeholder='Category name' value={categoryDetails?categoryDetails.name:''}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                        <TextInput placeholder='Category description'></TextInput>
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
export default CreateMenu
