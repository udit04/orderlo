import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { SolidButton, TextInputWrapper, TextInput } from '../../../src/components/Login/LoginStyled'
import StyledModal from '../../../src/components/Modal/StyledModal'
import Router, {useRouter} from 'next/router';
import menuService from '../../../src/services/menuService'
import { queryStringToObject } from '../../../src/helpers/util'
function MenuProducts() {
    const modalRef = React.createRef();
    const [modal, setModal] = useState(false)
    const [restoDetail,setRestoDetail] = useState(null);
    const [productsArray,setProductsArray] = useState([]);
    const [categoryDetails,setCategoryDetails] = useState(null);
    const [subCategoryDetails,setSubCategoryDetails] = useState(null);
    const [prod,setProduct] = useState({name:'',desc:'',price:0,is_veg:false,is_alcohol:false,image_url: ''});
    const router = useRouter();

    const openSubCategoryModal = (data)=>{
        setModal(true);
    }

    useEffect(() => {
        const restoDetail = JSON.parse(localStorage.getItem('restoDetail'));
        if(restoDetail){
            setRestoDetail(restoDetail.restaurant);
            const obj = queryStringToObject("?"+router.asPath.split("?")[1]);
            if(obj.from && obj.from === 'category'){
                if(!isNaN(obj.c_id)){
                    fetchProducts(restoDetail.restaurant.id);
                    setCategoryDetails({name:obj.c_name,id:obj.c_id});
                    setSubCategoryDetails({name:obj.sc_name,id:obj.sc_id});
                    setModal(true);
                }
                else{
                    alert('Category not found. Redirecting you to category page...');
                    Router.push('/menu/category')
                }
            }else{
                fetchProducts(restoDetail.restaurant.id);
            }
        }else{
            Router.push('/restologin')
        }
    }, [])
    const onCloseModal = ()=>{
        setCategoryName('');
        setCategoryDesc('');
        setModal(false)
    }

    const fetchProducts = (id)=>{
        menuService.fetchProducts({restaurant_id: id}).then(res=>{
            setProductsArray(res.data.products);
        }).catch(err=>{})
    }

    const saveProduct = ()=>{
        menuService.createProduct({
            "name" : prod.name,
            "price": prod.price,
            "is_veg": prod.is_veg == 'false' ? false : true,
            "image": prod.image_url,
            "is_alcohol": prod.is_alcohol == 'false' ? false : true,
            "restaurant_id": restoDetail.id,
            "category_id": categoryDetails.id,
            "subcategory_id": subCategoryDetails && subCategoryDetails.id
        }).then(res=>{
            setModal(false);
            setProduct({name:'',desc:'',price:0,is_veg:false,is_alcohol:false,image_url: ''})
            fetchProducts(restoDetail.id);
        }).catch(err=>{
            setModal(false);
        })
    }
    return (
        <CategoryWrapper>
            <CategoryList >
            <Flex column alignCenter>
                <Flex>
                <SolidButton onClick={openSubCategoryModal} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add Product</SolidButton>
                </Flex>
                {productsArray.map(cat=>(<CreateProduct setModal={setModal} data={cat}/>))}
            </Flex>
            </CategoryList>
            {   modal &&
                <StyledModal contentRef={modalRef} onClose={()=>{setModal(false)}}>
                    <ModalContent ref={modalRef}>
                        <h3>Create Product</h3>
                        <TextInputWrapper>
                            <TextInput placeholder='Category name' value={categoryDetails && categoryDetails.name} disabled></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <TextInput placeholder='Sub Category Name' value={subCategoryDetails && subCategoryDetails.name} disabled></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <TextInput placeholder='Product Name' value={prod.name} onChange={(e)=>setProduct({name:e.target.value,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:prod.image_url})}></TextInput>
                        </TextInputWrapper>
                        {/* <TextInputWrapper>
                            <TextInput placeholder='Product Description' value={prod.desc} onChange={(e)=>setProduct({name:prod.name,desc:e.target.value,price:prod.price,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:prod.image_url})}></TextInput>
                        </TextInputWrapper> */}
                        <TextInputWrapper>
                            <TextInput placeholder='Price' value={prod.price} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:e.target.value,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:prod.image_url})}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <TextInput placeholder='Veg' value={prod.is_veg} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:prod.price,is_veg:e.target.value,is_alcohol:prod.is_alcohol,image_url:prod.image_url})}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <TextInput placeholder='Alcoholic' value={prod.is_alcohol} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:e.target.value,image_url:prod.image_url})}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <TextInput placeholder='Image Url' value={prod.image_url} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:e.target.value})}></TextInput>
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

function CreateProduct({data,setModal}) {
    return (
        <ProductComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
            <Flex justifyBetween alignCenter>
            {data.name}
            <Flex>
                {/* <SolidButton onClick={()=>{addProductClick(true)}}  style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add Item</SolidButton> */}
            </Flex>
            </Flex>
        </ProductComp>
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
const ProductComp = styled.div`
    padding:1rem;
    width:100%;
    display:block;
    border-bottom:1px solid #c5c5c5;
`;

export default MenuProducts;