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
    const [prod,setProduct] = useState({name:'',desc:'',price:'',is_veg:false,is_alcohol:false,image_url: '',product_id:null});
    const [categories,setCategories] = useState(null);
    const [subCategories,setSubCategories] = useState(null);
    const [vegRadio,setVegRadio] = useState(null);
    const [alchoholicRadio,setAlchoholicRadio]  =  useState(false);
    const [edit,setEditButton] = useState(false);

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
                    fetchCategories(restoDetail.restaurant.id);
                    setCategoryDetails({name:decodeURIComponent(obj.c_name),id:obj.c_id});
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
        setVegRadio(null);
        setModal(false);
        setProduct({name:'',desc:'',price:'',is_veg:false,is_alcohol:false,image_url: '',product_id:null});
        setAlchoholicRadio(false);
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
    const saveProduct = async ()=>{
        const body_to_send = {
            "name" : prod.name,
            "price": parseFloat(prod.price),
            "is_veg": vegRadio ? true : false,
            "image": prod.image_url,
            "is_alcohol": alchoholicRadio?true:false,
            "restaurant_id": restoDetail.id,
            "category_id": categoryDetails.id != -1 ? categoryDetails.id : null,
            "subcategory_id": subCategoryDetails && subCategoryDetails.id != -1 ? subCategoryDetails.id : null,
            "description": prod.desc
        };
        try {
            if(edit===true){
                body_to_send.product_id = prod.product_id;
                await menuService.editProduct(body_to_send);
            }
            else{
                await menuService.createProduct(body_to_send);  
            }
            resetState();
            fetchProducts(restoDetail.id);
        } catch (error) {
            setModal(false);
        }
    }
    const resetState = ()=>{
        setVegRadio(null);
        setEditButton(false);
        setCategoryDetails(null);
        setSubCategoryDetails(null);
        setProduct({name:'',desc:'',price:'',is_veg:false,is_alcohol:false,image_url: '',product_id:null});
        setAlchoholicRadio(false);
        setModal(false);
    }

    return (
        <CategoryWrapper>
            <CategoryList >
            <div style={{textAlign:'right',margin:'10px'}}>
                <DashboadBtn as='button' onClick={()=>Router.push(`/dashboard/${restoDetail.id}`)} >Back To Dashboard</DashboadBtn>
                <DashboadBtn as='button' onClick={()=>Router.push(`/menu/category`)}>View Categories</DashboadBtn>
            </div>
            <Flex justifyCenter>
                <SolidButton onClick={openSubCategoryModal} style={{width:'200px',fontSize: '0.9rem',whiteSpace:'nowrap',margin:'1rem'}}>Add Product</SolidButton>
            </Flex>
            <Table column>
                
                {/* <table style={{maxWidth: '700px',textAlign:'left',fontSize: '1.2rem', padding:'0.2rem'}}>  */}
                <thead>
                    <tr >  
                        <td w={70}>S.No</td>
                        <td  w={200}>Name</td>
                        <td w={100}>Price</td>
                        <td w={150}>Veg<br/>/Non-Veg</td>
                        <td >Alcoholic</td>
                        <td >Category</td>
                        <td >Sub Category</td>
                        <td > Edit</td>
                    </tr>
                </thead>
                {/* </tr> */}
                <tbody>
                    {productsArray.map((cat,i)=>(<CreateProduct index={i} setModal={setModal} data={cat} key={i} selectSubCategory={selectSubCategory} selectCategory={selectCategory} setProduct={setProduct} setVegRadio={setVegRadio} setAlchoholicRadio={setAlchoholicRadio} setEditButton={setEditButton} setSubCategoryDetails={setSubCategoryDetails} />))}
                </tbody>
            </Table>
            </CategoryList>
            {   modal &&
                <StyledModal contentRef={modalRef} onClose={()=>{resetState();}}>
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
                            <CategorySelect as='select' onChange={(e)=>selectSubCategory(e.target.value)} style={{width:'100%'}} defaultValue={subCategoryDetails ? subCategoryDetails.id : -1}>
                                <option value={-1} key={-1}>N.A.</option>
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
                            <TextInput placeholder='Product Name' value={prod.name} onChange={(e)=>setProduct({name:e.target.value,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:prod.image_url,product_id:prod.product_id})}></TextInput>
                        </TextInputWrapper>
                        {/* <TextInputWrapper>
                            <TextInput placeholder='Product Description' value={prod.desc} onChange={(e)=>setProduct({name:prod.name,desc:e.target.value,price:prod.price,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:prod.image_url})}></TextInput>
                        </TextInputWrapper> */}
                        <TextInputWrapper>
                            <div><b>Product Price</b></div>
                            <TextInput type='number' placeholder='Price' value={prod.price} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:e.target.value,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:prod.image_url,product_id:prod.product_id})}></TextInput>
                        </TextInputWrapper>

                        <Flex>
                            <TextInputWrapper>
                                <label className='container' htmlFor="NonVegOption"><Flex>
                                {
                                    vegRadio === null ? 
                                    <input id='NonVegOption' onChange={(e)=>{setVegRadio(true)}} type='radio' name='vegOption' value='veg' />: 
                                    <input id='NonVegOption' onChange={(e)=>{setVegRadio(true)}} type='radio' name='vegOption' value='veg' defaultChecked={vegRadio === true ? true : false} />
                                }
                                <span className="checkmark"></span><div>Veg</div></Flex></label>

                            </TextInputWrapper>

                            <TextInputWrapper>
                                <label className='container' htmlFor="vegOption"><Flex>
                                {
                                    vegRadio === null ? 
                                    <input id='vegOption' onChange={(e)=>{setVegRadio(false)}} type='radio' name='vegOption' value='nonveg' />: 
                                    <input id='vegOption' onChange={(e)=>{setVegRadio(false)}} type='radio' name='vegOption' value='nonveg' defaultChecked={vegRadio !== true ? true : false} />
                                }
                                <span className="checkmark"></span><div>Non-Veg</div></Flex></label>
                            </TextInputWrapper>
                        </Flex>

                        <TextInputWrapper>
                            <label  htmlFor="alchoholic"><input id='alchoholic' onChange={(e)=>{setAlchoholicRadio(!alchoholicRadio)}} type='checkbox' defaultChecked={alchoholicRadio} name='alchoholic' value='alchoholic'/>Alcoholic</label>
                            {/* <TextInput placeholder='Alcoholic' value={prod.is_alcohol} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:e.target.value,image_url:prod.image_url})}></TextInput> */}
                        </TextInputWrapper>

                        <TextInputWrapper>
                            <div><b>Image Url</b></div>
                            <TextInput placeholder='Image Url' value={prod.image_url} onChange={(e)=>setProduct({name:prod.name,desc:prod.desc,price:prod.price,is_veg:prod.is_veg,is_alcohol:prod.is_alcohol,image_url:e.target.value,product_id:prod.product_id})}></TextInput>
                        </TextInputWrapper>



                        <TextInputWrapper style={{position:'sticky',bottom: '0', textAlign:'center'}}>
                            <SolidButton disabled={(vegRadio === null || !prod.price || !prod.name || !categoryDetails)} onClick={saveProduct} style={{width:'20%'}}> Save</SolidButton>
                            <SolidButton onClick={()=>setModal(false)} style={{width:'20%','background':'red',margin:'10px'}}> Close</SolidButton>
                        </TextInputWrapper>
                    </ModalContent>
                </StyledModal>
            }
        </CategoryWrapper>
    )
}

function CreateProduct({data,index,setModal,selectCategory,selectSubCategory,setProduct, setVegRadio, setAlchoholicRadio, setEditButton,setSubCategoryDetails}) {

    const onEditClick=(data)=>{
        setModal(true);
        selectCategory(data.category_id ? data.category_id : -1);
        setProduct({name:data.name,desc:data.Description,price:data.price,is_veg:data.is_veg,is_alcohol:data.is_alcohol,image_url: data.image_url, product_id: data.id});
        setVegRadio(data.is_veg);
        setAlchoholicRadio(data.is_alcohol);
        //selectSubCategory(data.subcategory_id ? data.category[0].subCategory.find((sub)=>sub.id === data.subcategory_id).id : -1);
        let subData = data.subcategory_id ? data.category[0].subCategory.find((sub)=>sub.id === data.subcategory_id) : null;
        console.log('subData',subData);
        setSubCategoryDetails(subData ? {name:subData.name,id:subData.id} : null);
        setEditButton(true);
    }

    return (
        <tr >  
            <td w={70} flex={1} >{index+1})</td>
            <td  w={200}> {data.name}</td>
            <td w={100} > {'\u{20B9}'}{data.price}</td>
            {
                data.is_veg ? <td w={100} ><img src="https://img.icons8.com/color/28/000000/vegetarian-food-symbol.png"/></td> : <td w={100} ><img src="https://img.icons8.com/color/28/000000/non-vegetarian-food-symbol.png"/></td>
            }     
            <td w={100} >{data.is_alcohol? '\u{1F37A}' : '-'} </td>
            <td w={100} >{data.category[0].name}</td>
            <td w={100} >{data.subcategory_id ? data.category[0].subCategory.find((sub)=>sub.id === data.subcategory_id).name : 'N.A'}</td>   
            <td w={100}  onClick={()=>(onEditClick(data))} > <SolidButton style={{background:'burlywood', padding:'10px'}} > Edit</SolidButton> </td>
        </tr>
    )
}


const TableData = styled.div`
    display:block;
    width:${({w})=>(w?w:100)+'px'};
    padding:0 5px;
    box-sizing:border-box;
`
const CategoryWrapper = styled.div`
    background:#f5f5f5;
    min-height:100vh;
`;
const CategoryList = styled.div`
    max-width: 900px;
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

export const DashboadBtn = styled.div`
        background: lightseagreen;
        border-radius: 10px;
        padding: 10px;
        margin-left: 10px;
        border: none;
        color: #fff;
        font-weight: 800;
        padding: 10px 1rem;
        &:active,&:hover{
            outline:none;
        }
`

const Table = styled.table`
        font-size:1.25rem;
        border-spacing:0;
        width:900px;
        border-collapse:collapse;
        thead{
            td{
               font-weight:bold;
               color:#666666;
            }
            border:1px solid #999999;
            border-collapse:collapse;

        }
        td{
            border:1px solid #999999;
            border-collapse:collapse;
            padding-left:10px;
            padding-right:10px;
            max-width: 200px;
        }
        text-align: center;
`
export default MenuProducts;