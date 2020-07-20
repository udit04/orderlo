import React,{ useState, useEffect } from 'react'
import StyledModal from '../Modal/StyledModal'
import styled from 'styled-components';
import Flex from 'styled-flex-component'
import Router,{useRouter} from 'next/router';
import SkeletonLoader from '../SkeletonLoader';
import ProductList,{ProductListDashboard} from '../ProductList';
import productService from '../../services/productService';
import ProductSearch from '../ProductSearch';
import { SolidButton } from '../Login/LoginStyled';

function EditOrderModal(props) {
    const {onClose,restaurant,orderDetail,res_id} = props;

    const contentRef = React.createRef();
    
    const [sidebar, setsidebar] = useState(false);
    const [productsData, setproductsData] = useState(null)
    const [filteredData,setFilteredData] = useState([]);
    const [collections,setCollections] = useState([]);
    const [store,setStore] = useState(null);
    const [search,setSearch ] = useState('');
    const [cartProducts,setCartProducts]= useState(orderDetail.products);

    useEffect(() => {
        if(res_id)
        {
            productService.getRestoProducts({id:res_id}).then(res=>{
                if(res.status===200){
                    setproductsData(res.data.menu);
                }else{
                    
                }
            }).catch(err=>{
                console.log(err);
            }) 
        }
    }, [])

    const onProductSearch = (e)=>{
        setSearch(e.target.value);
        let filtered = [];
        productsData.forEach(element => {
            if((element.name.toLowerCase()).indexOf(e.target.value.toLowerCase()) !== -1){
                filtered.push(element)
            }
        });
        const dataCollections =  filtered.reduce(function (accumulator, element) {
            accumulator[element.category] = accumulator[element.category] || [];
            accumulator[element.category].push(element);
            return accumulator;
        }, Object.create(null));

        let filteredCollections = []

        for (const key in dataCollections) {
            console.log(key,dataCollections[key]);
            filteredCollections.push({
                name:key,
                products:[...dataCollections[key]]
            })
        }
        
        setFilteredData(filteredCollections);
    }

    const onAdd = (product)=>{
        if(cartProducts.find((prod)=>prod.id === product.id)){
            console.log('here')
            setCartProducts(cartProducts.map((prod)=>{
                if(prod.id === product.id){
                    ++prod.qty;
                }
                return prod;
            }))
        }
        else{
            let arr = Array.from(cartProducts);
            product.qty = 1;
            arr.push(product);
            setCartProducts(arr)
        }
    }

    const onRemove = (product)=>{
        if(cartProducts.find((prod)=>prod.id === product.id)){
            setCartProducts(cartProducts.map((prod)=>{
                if(prod.id === product.id){
                    --prod.qty;
                }
                if(prod.qty===0){
                    return null;
                }
                return prod;
            }).filter((item)=>item!==null))
        }
    }

    const editOrder = ()=>{
        let arr = cartProducts.map((prod)=>{
            return {
                product_id:prod.id,
                addons:[],
                qty:prod.quantity
            }
        })
        const body_to_send = {
            "restaurant_id" : res_id,
            "order_id" : orderDetail.id,
            "products": arr
        };
        productService.editOrder(body_to_send).then(res=>{
            if(res.status===200){
            }else{
            }
        }).catch(err=>{
            console.log(err);
        }) 
    }

    const foodProducts = cartProducts.filter(p=>p.is_alcohol===false);
    const alcoholProducts = cartProducts.filter(p=>p.is_alcohol===true);

    return (
        <div>
            <StyledModal contentRef={contentRef} onClose={onClose}> 
                <EditContainer ref={contentRef}>
                    <Flex>
                        <Flex column style={{width:'500px',height: '600px',overflowY: 'scroll',paddingRight: '1rem',borderRight: '4px solid #eeeeee',marginRight:'1rem'}}>
                                
                            <ProductSearcWrapper style={{position: 'sticky',top: '0'}}>
                                <ProductSearch value={search} clearSearch={()=>{setSearch('')}} placeholder='Search food' onChange={onProductSearch}/>
                            </ProductSearcWrapper>
                                    
                           
                            {productsData && search!==''
                                ?
                                productsData.map(collection=>{
                                    return(
                                        <>
                                        
                                        {
                                            collection.products.filter(p=>(p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)).length>0
                                                &&
                                            <CollectionName id={collection.name} >{collection.name}</CollectionName>
                                        
                                        }
                                        <ProductListDashboard cartProducts={orderDetail.products} search={search} restaurant={restaurant} productsData={collection.products}/>
                                        {
                                            collection.subCategory.map(coll=>{
                                                return(
                                                    <>
                                                    {coll.products.filter(p=>(p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)).length>0
                                                        &&
                                                    <CollectionName id={coll.name} >{coll.name}</CollectionName>
                                                    }
                                                    <ProductListDashboard cartProducts={orderDetail.products} onAdd={onAdd} onRemove={onRemove} search={search} restaurant={restaurant} productsData={coll.products}/>
                                                    </>
                                                )
                                            })
                                        }
                                        </>
                                    )
                                })
                                :
                                ''
                            }
                            {productsData && search === ''
                                ?
                                productsData.map(collection=>{
                                    return(
                                        <>
                                        <CollectionName id={collection.name} >{collection.name}</CollectionName>
                                        <ProductListDashboard cartProducts={orderDetail.products} onAdd={onAdd} onRemove={onRemove} search={search} restaurant={restaurant} productsData={collection.products}/>
                                        {
                                            collection.subCategory.map(coll=>{
                                                return(
                                                    <>
                                                    <CollectionName id={coll.name} >{coll.name}</CollectionName>
                                                    <ProductListDashboard cartProducts={orderDetail.products} onAdd={onAdd} onRemove={onRemove} search={search} restaurant={restaurant} productsData={coll.products}/>
                                                    </>
                                                )
                                            })
                                        }
                                        </>
                                    )
                                })
                                :
                                ''
                            }
                            
                            
                            {(search==='' && productsData === null)
                                &&
                                <SkeletonLoader screen='mobile'/>
                            }
                            
                        </Flex>
                        <Flex column style={{padding:'1rem',width:'100%',maxWidth:'600px'}}>
                            {
                                cartProducts && cartProducts.length > 0
                                    &&
                                <>  
                                    
                                    <DetailMain>Food Bill Details</DetailMain>
                                    {console.log('cartProducts',cartProducts.length)}
                                    <ProductListDashboard onAdd={onAdd} onRemove={onRemove} noImage={true} search={search} restaurant={restaurant} productsData={foodProducts} />
                                    {
                                        alcoholProducts.length>0 ? 
                                        <>
                                        <DetailMain>Liquor Bill Details</DetailMain>
                                        <ProductListDashboard onAdd={onAdd} onRemove={onRemove} noImage={true} search={search} restaurant={restaurant} productsData={alcoholProducts}/></> : null
                                    }
                                    
                                </>
                            }
                            <SolidButton style={{background: 'rgb(241 166 45)',maxWidth: '250px',margin:'0 auto'}}> Add Items</SolidButton>
                        </Flex>
                    </Flex>
                </EditContainer>
            </StyledModal>
        </div>
    )
}

export default EditOrderModal


const EditContainer = styled.div`
    max-width: 1200px;
    width: 100%;
    background: #fff;
    border-radius: 20px;
    min-height: 400px;
    max-height: 90vh;
    padding:2rem;   
`


const Categories = styled.div`
    background: #fff;
    /* color: #ffff; */
    padding-left: 1rem;
    padding-top: 1rem;
    position: sticky;
    top: 0;
    padding-left: 0;
`
const CategoriesTitle = styled.div`
    font-size:1rem;
    font-weight:800;
    color:#333;
    margin-left:1rem;
`
const CateogryWrapper = styled.div`
    display:flex;
    overflow-x: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* Chrome/Safari/Webkit */
    }

`
const Category = styled.div`
    margin:0.5rem;
    white-space:nowrap;
    color: #999999;
    text-decoration: none;
    margin-left: 0;
    text-transform:capitalize;
    &:nth-child(1){
        margin-left:1rem;
    }
    &:last-child(1){
        margin-right:1rem;
    }
`

export const CollectionName = styled.div`
    padding: 0.5rem 1rem;
    padding-bottom:0.25rem;
    font-weight: 700;
    color:#333;
    text-transform:capitalize;
`
const StoreImage = styled.img`
    display: block;
    width: 100%;
    height: 200px;
    background: #efefef;
`
const StoreWrapper = styled.div`
    position:relative;
    transform-origin: 50vw 50vh;
    transition: all 0.2s;
    z-index: 1000;
    overflow:auto;
    height:auto;
    &.sidebar-active{
        max-height: 100vh;
        transform: translateX(-40%) scale(0.7);
        overflow: hidden;
        transition: all 0.2s;
        box-sizing: border-box;
        box-shadow: 1px 1px 50px 1px rgba(255, 255, 255, 0.05);
    }

`


const RestoDetails = styled.div`
    display:block;
`

const RestoInfoCard = styled.div`
    border-radius:10px;
    padding:1rem;
    z-index: 2000;
    box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.1);
    width: 80%;
    margin: auto;
    display: block;
    position: relative;
    margin-top: -2rem;
    background: #fff;
    z-index: 2000;
    box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.1);
    .title{
        display:block;
        color:#333333;
        font-weight:600;
    }
    .address{
        display:block;
        color:#aaaaaa;
    }
`

const ProductSearcWrapper= styled.div`
    
    & input{
        background:#eeeeee;
        color:#999;
    }
    & input::placeholder{
        color:#999;
    }
    width: 80%;
    margin: 0.5rem auto;
    svg{
        path{
            fill:#999;
        }
    }
`

const DetailMain = styled.div`
font-size:1.25rem;
color:#3c4dae;
`