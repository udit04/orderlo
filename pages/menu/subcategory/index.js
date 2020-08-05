import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { SolidButton, TextInputWrapper, TextInput } from '../../../src/components/Login/LoginStyled'
import StyledModal from '../../../src/components/Modal/StyledModal'
import Router, {useRouter} from 'next/router';
import menuService from '../../../src/services/menuService'
import { queryStringToObject } from '../../../src/helpers/util'
function SubCategory() {
    const modalRef = React.createRef();
    const [modal, setModal] = useState(false)
    const [restoDetail,setRestoDetail] = useState(null);
    const [subCategories,setSubCategories] = useState([]);
    const [categoryDetails,setCategoryDetails] = useState({});
    const [sc,setSc] = useState({name:'',desc:''});
    const router = useRouter();

    const openSubCategoryModal = (data)=>{
        setModal(true);
    }

    useEffect(() => {
        const restoDetail = JSON.parse(localStorage.getItem('restoDetail'));
        if(restoDetail){
            setRestoDetail(restoDetail.restaurant);
            const obj = queryStringToObject("?"+router.asPath.split("?")[1]);
            if(!isNaN(obj.category_id)){
                fetchSubCategories(restoDetail.restaurant.id,obj.category_id);
                setCategoryDetails({name:obj.category_name,id:obj.category_id});
                if(obj.from && obj.from === 'category'){
                    setModal(true);
                }
            }
            else{
                alert('Category not found. Redirecting you to category page...');
                Router.push('/menu/category')
            }
        }else{
        }
    }, [])
    const onCloseModal = ()=>{
        setCategoryName('');
        setCategoryDesc('');
        setModal(false)
    }

    const fetchSubCategories = (id,cat_id)=>{
        menuService.fetchSubCategories({restaurant_id: id, category_id: cat_id}).then(res=>{
            setSubCategories(res.data.data);
        }).catch(err=>{})
    }

    const saveCategory = ()=>{
        menuService.createSubCategory({
                "name" : sc.name,
                "description": sc.desc,
                "category_id": categoryDetails.id,
                "tags": null
        }).then(res=>{
            setModal(false);
            setSc({name:'',desc:''})
            fetchSubCategories(restoDetail.id,categoryDetails.id);
        }).catch(err=>{
            setModal(false);
        })
    }
    return (
        <CategoryWrapper>
            <CategoryList >
            <Flex column alignCenter>
                <Flex>
                <SolidButton onClick={openSubCategoryModal} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add SubCategory</SolidButton>
                </Flex>
                {subCategories.map(cat=>(<CreateSubCategory setModal={setModal} data={cat}/>))}
            </Flex>
            </CategoryList>
            {   modal &&
                <StyledModal contentRef={modalRef} onClose={()=>{setModal(false)}}>
                    <ModalContent ref={modalRef}>
                        <h3>Create Sub Category</h3>
                        <TextInputWrapper>
                            <TextInput placeholder='Category name' value={categoryDetails.name} disabled></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <TextInput placeholder='Sub Category Name' value={sc.name} onChange={(e)=>setSc({name:e.target.value, desc: sc.desc})}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <TextInput placeholder='Sub Category Dscription' value={sc.desc} onChange={(e)=>setSc({name:sc.name, desc: e.target.value})}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <SolidButton onClick={saveCategory}> Save</SolidButton>
                        </TextInputWrapper>
                    </ModalContent>
                </StyledModal>
            }
        </CategoryWrapper>
    )
}

function CreateSubCategory({data,setModal}) {
    const addProductClick = ()=>{
        setModal(true);
        setProductModal();
    }
    return (
        <SubCategoryComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
            <Flex justifyBetween alignCenter>
            {data.name}
            <Flex>
                <SolidButton onClick={()=>{addProductClick(true)}}  style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add Item</SolidButton>
            </Flex>
            </Flex>
        </SubCategoryComp>
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
const SubCategoryComp = styled.div`
    padding:1rem;
    width:100%;
    display:block;
    border-bottom:1px solid #c5c5c5;
`;

export default SubCategory;