import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { SolidButton, TextInputWrapper, TextInput } from '../../../src/components/Login/LoginStyled'
import StyledModal from '../../../src/components/Modal/StyledModal'
import Router, {useRouter} from 'next/router';
import menuService from '../../../src/services/menuService'
import { queryStringToObject } from '../../../src/helpers/util'
import { IsVeg } from '../../../src/components/IsVeg'
function MenuProducts() {
    const modalRef = React.createRef();
    const [modal, setModal] = useState(false)
    const [restoDetail,setRestoDetail] = useState(null);
    const [productsArray,setProductsArray] = useState([]);
    const [categoryDetails,setCategoryDetails] = useState(null);
    const [subCategoryDetails,setSubCategoryDetails] = useState(null);
    const [prod,setProduct] = useState({name:'',desc:'',price:0,is_veg:false,is_alcohol:false,image_url: ''});
    const [categories,setCategories] = useState(null);
    const [subCategories,setSubCategories] = useState(null);
    const [vegRadio,setVegRadio] = useState(null);
    const [alchoholicRadio,setAlchoholicRadio]  =  useState(null);

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
                fetchCategories(restoDetail.restaurant.id);
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
    const fetchCategories = (id)=>{
        menuService.fetchCategories({restaurant_id: id}).then(res=>{
            setCategories(res.data.data);

            if(res.data && res.data.data && res.data.data.length >0){
                const selectedCategory = res.data.data[0];
                
                setCategoryDetails({name:selectedCategory.name,id:selectedCategory.id});

                menuService.fetchSubCategories({restaurant_id:restoDetail.id,category_id:selectedCategory.id}).then(res=>{
                        if(res.dat && res.data.data){
                            setSubCategories(res.data.data)
                        
                            setSubCategoryDetails({name:res.data.data[0].name,id:res.data.data[0].id});
                        }

                }).catch(err=>{

                });

            }
            // console.log(res.data);
        }).catch(err=>{});
    }
    const fetchProducts = (id)=>{
        menuService.fetchProducts({restaurant_id: id}).then(res=>{
            setProductsArray(res.data.products);
        }).catch(err=>{})
    }
    const selectCategory = (e)=>{
        const selectedCategory = categories.filter(cat=>cat.id == e.target.value)[0];
        setCategoryDetails({name:selectedCategory.name,id:selectedCategory.id});
        menuService.fetchSubCategories({restaurant_id:restoDetail.id,category_id:e.target.value}).then(res=>{
                setSubCategories(res.data.data)

        }).catch(err=>{

        });
    }
    const selectSubCategory = (e)=>{
        const selectedSubCategory = subCategories.filter(cat=>cat.id == e.target.value)[0];

        setSubCategoryDetails({name:selectedSubCategory.name,id:selectedSubCategory.id});
        
    }
    const saveProduct = ()=>{
        menuService.createProduct({
            "name" : prod.name,
            "price": prod.price,
            "is_veg": vegRadio ? true : false,
            "image": prod.image_url,
            "is_alcohol": alchoholicRadio?true:false,
            "restaurant_id": restoDetail.id,
            "category_id": categoryDetails.id,
            "subcategory_id": subCategoryDetails && subCategoryDetails.id
        }).then(res=>{
            setModal(false);
            setProduct({name:'',desc:'',price:0,is_veg:vegRadio,is_alcohol:false,image_url: ''})
            setCategoryDetails(null);
            setSubCategoryDetails(null);
            fetchProducts(restoDetail.id);
            setVegRadio(null);
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
                        
                        { (categories && categories.length>0)
                            ?
                            <TextInputWrapper>
                            <div><b>Select Category</b></div>
                            <CategorySelect as='select' onChange={selectCategory}>
                                {categories.map(cat=>{
                                    return(<option  value={cat.id}>{cat.name}</option>)
                                })}
                                
                            </CategorySelect>
                            {/* <TextInput placeholder='Category name' value={categoryDetails && categoryDetails.name} disabled></TextInput> */}
                            </TextInputWrapper>
                            :
                            <TextInputWrapper>
                                <div><b>Add Category</b></div>
                                <TextInput placeholder='Category name' value={categoryDetails && categoryDetails.name} ></TextInput>
                            </TextInputWrapper>
                        }
                        { (subCategories && subCategories.length>0)
                            ?
                            <TextInputWrapper>
                            <div><b>Select SubCategory</b></div>
                            <CategorySelect as='select' onChange={selectSubCategory}>
                                {subCategories.map(cat=>{
                                    return(<option  value={cat.id}>{cat.name}</option>)
                                })}
                                
                            </CategorySelect>
                            {/* <TextInput placeholder='Category name' value={categoryDetails && categoryDetails.name} disabled></TextInput> */}
                            </TextInputWrapper>
                            :
                            <TextInputWrapper>
                                <div><b>SubCategory</b></div>
                                <TextInput placeholder='Sub Category Name' value={subCategoryDetails && subCategoryDetails.name} disabled></TextInput>
                            </TextInputWrapper>
                        }
                        
                        <TextInputWrapper>
                            <div><b>Product Name</b></div>
                            <TextInput placeholder='Product Name' value={prod.name} onChange={(e)=>setProduct({name:e.target.value,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:prod.image_url})}></TextInput>
                        </TextInputWrapper>
                        {/* <TextInputWrapper>
                            <TextInput placeholder='Product Description' value={prod.desc} onChange={(e)=>setProduct({name:prod.name,desc:e.target.value,price:prod.price,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:prod.image_url})}></TextInput>
                        </TextInputWrapper> */}
                        <TextInputWrapper>
                            <div><b>Product Price</b></div>
                            <TextInput placeholder='Price' value={prod.price} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:e.target.value,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:prod.image_url})}></TextInput>
                        </TextInputWrapper>

                        <Flex>
                            <TextInputWrapper>
                                <label class='container' htmlFor="vegOption"><Flex><input id='vegOption' onChange={(e)=>{setVegRadio(e.target.value)}} type='radio' name='vegOption' value='veg'/><span class="checkmark"></span><div>Veg</div></Flex></label>

                            </TextInputWrapper>

                            <TextInputWrapper>
                                <label class='container' htmlFor="NonVegOption"><Flex><input id='NonVegOption' onChange={(e)=>{setVegRadio(e.target.value)}} type='radio' name='vegOption' value='nonveg'/><span class="checkmark"></span><div>Non-Veg</div></Flex></label>

                            </TextInputWrapper>

                        </Flex>

                        <TextInputWrapper>
                            <label  htmlFor="alchoholic"><input id='alchoholic' onChange={(e)=>{setAlchoholicRadio(!alchoholicRadio)}} type='checkbox' defaultChecked={false} checked={alchoholicRadio} name='alchoholic' value='alchoholic'/>Alcoholic</label>
                            {/* <TextInput placeholder='Alcoholic' value={prod.is_alcohol} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:e.target.value,image_url:prod.image_url})}></TextInput> */}
                        </TextInputWrapper>

                        <TextInputWrapper>
                            <div><b>Image Url</b></div>
                            <TextInput placeholder='Image Url' value={prod.image_url} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:e.target.value})}></TextInput>
                        </TextInputWrapper>



                        <TextInputWrapper>
                            <SolidButton disabled={(vegRadio === null)} onClick={saveProduct}> Save</SolidButton>
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

const CategorySelect = styled.div`
    padding: 0.9rem 1rem;
    border-radius: 10px;
    border: 1px solid #d1d1d1;
    cursor: pointer;
    padding-right: 2rem;
`;

export default MenuProducts;