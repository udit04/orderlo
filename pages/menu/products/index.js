import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Flex,{FlexItem} from 'styled-flex-component'
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
    const [prod,setProduct] = useState({name:'',desc:'',price:'',is_veg:false,is_alcohol:false,image_url: ''});
    const [categories,setCategories] = useState(null);
    const [subCategories,setSubCategories] = useState(null);
    const [vegRadio,setVegRadio] = useState(null);
    const [alchoholicRadio,setAlchoholicRadio]  =  useState(false);

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
        alert('ff')
        setCategoryName('');
        setCategoryDesc('');
        setVegRadio(null);
        setModal(false);
    }
    const fetchCategories = (id)=>{
        menuService.fetchCategories({restaurant_id: id}).then(res=>{
            setCategories(res.data.data);
            // if(res.data && res.data.data && res.data.data.length >0){
            //     const selectedCategory = res.data.data[0];
            //     menuService.fetchSubCategories({restaurant_id:restoDetail.id,category_id:selectedCategory.id}).then(res=>{
            //         if(res.dat && res.data.data){
            //             setSubCategories(res.data.data)        
            //             setSubCategoryDetails({name:res.data.data[0].name,id:res.data.data[0].id});
            //         }
            //     }).catch(err=>{
            //     });
            // }
        }).catch(err=>{});
    }
    const fetchProducts = (id)=>{
        menuService.fetchProducts({restaurant_id: id}).then(res=>{
            setProductsArray(res.data.products);
        }).catch(err=>{})
    }
    const selectCategory = (id)=>{
        if(Number(id)!==-1){
            const selectedCategory = categories.filter(cat=>cat.id == id)[0];
            setCategoryDetails({name:selectedCategory.name,id:selectedCategory.id});
            menuService.fetchSubCategories({restaurant_id:restoDetail.id,category_id:id}).then(res=>{
                setSubCategories(res.data.data);
            }).catch(err=>{
            });
        }
        else{
            setCategoryDetails(null);
            setSubCategories(null);
        }
        setSubCategoryDetails(null);
    }
    const selectSubCategory = (id)=>{
        if(Number(id)!==-1){
            const selectedSubCategory = subCategories.filter(cat=>cat.id == id)[0];
            setSubCategoryDetails({name:selectedSubCategory.name,id:selectedSubCategory.id});
        }
        else{
            setSubCategoryDetails(null);
        }
    }
    const saveProduct = ()=>{
        menuService.createProduct({
            "name" : prod.name,
            "price": prod.price,
            "is_veg": vegRadio ? true : false,
            "image": prod.image_url,
            "is_alcohol": alchoholicRadio?true:false,
            "restaurant_id": restoDetail.id,
            "category_id": categoryDetails.id != -1 ? categoryDetails.id : null,
            "subcategory_id": subCategoryDetails && subCategoryDetails.id != -1 ? subCategoryDetails.id : null
        }).then(res=>{
            setModal(false);
            setProduct({name:'',desc:'',price:0,is_veg:vegRadio,is_alcohol:false,image_url: ''})
            fetchProducts(restoDetail.id);
            setVegRadio(null);
        }).catch(err=>{
            setModal(false);
        })
    }
    console.log('categorydetails',categoryDetails);

    return (
        <CategoryWrapper>
            <CategoryList >
            <Flex column alignCenter>
                <Flex>
                <SolidButton onClick={openSubCategoryModal} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Add Product</SolidButton>
                </Flex>
                {productsArray.map((cat,i)=>(<CreateProduct setModal={setModal} data={cat} key={i} selectSubCategory={selectSubCategory} selectCategory={selectCategory} setProduct={setProduct} setVegRadio={setVegRadio} setAlchoholicRadio={setAlchoholicRadio}/>))}
            </Flex>
            </CategoryList>
            {   modal &&
                <StyledModal contentRef={modalRef} onClose={()=>{setModal(false);setVegRadio(null);}}>
                    <ModalContent ref={modalRef}>
                        <h3>Create Product</h3>
                        
                        { (categories && categories.length>0)
                            ?
                            <TextInputWrapper>
                            <div><b>Select Category</b></div>
                            <CategorySelect as='select' onChange={(e)=>selectCategory(e.target.value)} style={{width:'100%'}} defaultValue={categoryDetails ? categoryDetails.id : -1}>
                                <option value={-1} key={-1}>Select Category</option>
                                {categories.map((cat,i)=>{
                                    return(<option value={cat.id} key={i}>{cat.name} </option>)
                                })}
                                
                            </CategorySelect>
                            {/* <TextInput placeholder='Category name' value={categoryDetails && categoryDetails.name} disabled></TextInput> */}
                            </TextInputWrapper>
                            :
                            <TextInputWrapper>
                                <div><b>Add Category</b></div>
                                <TextInput disabled placeholder='Category name' value={categoryDetails && categoryDetails.name} ></TextInput>
                            </TextInputWrapper>
                        }
                        { (subCategories && subCategories.length>0)
                            ?
                            <TextInputWrapper>
                            <div><b>Select SubCategory</b></div>
                            <CategorySelect as='select' onChange={(e)=>selectSubCategory(e.target.value)} style={{width:'100%'}}>
                                <option value={-1} key={-1}>Select Sub Category</option>
                                {subCategories.map((cat,i)=>{
                                    return(<option  value={cat.id} key={i}>{cat.name}</option>)
                                })}
                            </CategorySelect>
                            {/* <TextInput placeholder='Category name' value={categoryDetails && categoryDetails.name} disabled></TextInput> */}
                            </TextInputWrapper>
                            :
                            <>
                            {
                                subCategoryDetails ? 
                                <TextInputWrapper>
                                    <div><b>Select SubCategory</b></div>
                                    <TextInput placeholder='Sub Category Name' value={subCategoryDetails && subCategoryDetails.name ? subCategoryDetails.name : '' } disabled></TextInput>
                                </TextInputWrapper> : null
                            }
                            </>
                            
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
                            <TextInput type='number' placeholder='Price' value={prod.price} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:e.target.value,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:prod.image_url})}></TextInput>
                        </TextInputWrapper>

                        <Flex>
                            <TextInputWrapper>
                                <label className='container' htmlFor="vegOption"><Flex><input id='vegOption' onChange={(e)=>{setVegRadio(e.target.value)}} type='radio' name='vegOption' value='veg' defaultChecked={vegRadio === true ? true : false}/><span className="checkmark"></span><div>Veg</div></Flex></label>

                            </TextInputWrapper>

                            <TextInputWrapper>
                                <label className='container' htmlFor="NonVegOption"><Flex><input id='NonVegOption' onChange={(e)=>{setVegRadio(e.target.value)}} type='radio' name='vegOption' value='nonveg' defaultChecked={vegRadio !== true ? true : false} /><span className="checkmark"></span><div>Non-Veg</div></Flex></label>

                            </TextInputWrapper>

                        </Flex>

                        <TextInputWrapper>
                            <label  htmlFor="alchoholic"><input id='alchoholic' onChange={(e)=>{setAlchoholicRadio(!alchoholicRadio)}} type='checkbox' defaultChecked={alchoholicRadio} name='alchoholic' value='alchoholic'/>Alcoholic</label>
                            {/* <TextInput placeholder='Alcoholic' value={prod.is_alcohol} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:e.target.value,image_url:prod.image_url})}></TextInput> */}
                        </TextInputWrapper>

                        <TextInputWrapper>
                            <div><b>Image Url</b></div>
                            <TextInput placeholder='Image Url' value={prod.image_url} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:e.target.value})}></TextInput>
                        </TextInputWrapper>



                        <TextInputWrapper style={{position:'sticky',bottom: '0', textAlign:'center'}}>
                            <SolidButton disabled={(vegRadio === null || !prod.price || !prod.name || !categoryDetails)} onClick={saveProduct} style={{width:'20%'}}> Save</SolidButton>
                        </TextInputWrapper>
                    </ModalContent>
                </StyledModal>
            }
        </CategoryWrapper>
    )
}

function CreateProduct({data,setModal,selectCategory,selectSubCategory,setProduct, setVegRadio, setAlchoholicRadio}) {

    const onEditClick=(data)=>{
        setModal(true);
        selectCategory(data.category_id ? data.category_id : -1);
        setProduct({name:data.name,desc:data.Description,price:data.price,is_veg:data.is_veg,is_alcohol:data.is_alcohol,image_url: data.image_url});
        setVegRadio(data.is_veg);
        setAlchoholicRadio(data.is_alcohol);
        selectSubCategory(data.subcategory_id ? data.subcategory_id : -1);
    }

    return (
        <ProductComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
            <Flex justifyBetween alignCenter>  
                <FlexItem > {data.name}</FlexItem>
                <FlexItem > Rs.{data.price}</FlexItem>
                <FlexItem onClick={()=>(onEditClick(data))} > <SolidButton style={{background:'burlywood', padding:'10px'}} > Edit</SolidButton> </FlexItem>
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