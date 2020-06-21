import React,{useState,useEffect} from 'react'
import ProductList from '../../src/components/ProductList';
import SimpleSlider from '../../src/components/Slider';
import Header from '../../src/components/Header';
import Sidebar from '../../src/components/Sidebar';
import  Flex  from 'styled-flex-component';
import styled from 'styled-components'
import productService from '../../src/services/productService';
import BottomTab from '../../src/components/BottomTab';
import  Router ,{ useRouter} from 'next/router';
import { StackHeader } from '../../src/components/Login/LoginStyled';
import { BackIcon, ShareIcon } from '../../src/Icons';
import ProductSearch from '../../src/components/ProductSearch';
export default function Restaurant(props) {
    const [sidebar, setsidebar] = useState(false);
    const [productsData, setproductsData] = useState(null)
    const [filteredData,setFilteredData] = useState(null);
    const [collections,setCollections] = useState(null);
    const [restaurant, setrestaurant] = useState(null)
    const [store,setStore] = useState(null);
    const router = useRouter();
    const { res_id } = router.query;
    const [search,setSearch ] = useState('');
    const [cartProducts,setCartProducts]= useState([]);
    useEffect(() => {
        const cartData = JSON.parse(window.localStorage.getItem('cartData'));
        if(cartData){
            if(cartData.store){
                console.log(cartData.store,'___store');
                setStore(cartData.store);
            }
        }
        
    }, [])
    useEffect(() => {
        if(res_id)
        {
            productService.getRestoProducts({id:res_id}).then(res=>{
                if(res.status===200){
                    console.log(res.data)
                    setproductsData(res.data.products);
                    const collectionsData =  res.data.products.reduce(function (r, a) {
                        r[a.category] = r[a.category] || [];
                        r[a.category].push(a);
                        return r;
                    }, Object.create(null));
                    console.log(collectionsData);
                    setrestaurant(res.data.restaurant);
                    setCollections(collectionsData);
                }else{
                    
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [res_id])

    const onBack = ()=>{
        if(store){
            Router.push(`/store/${store.id}`)
        }
    }
    const onProductSearch = (e)=>{
        setSearch(e.target.value);
        let filtered = [];
        productsData.forEach(element => {
            if((element.name.toLowerCase()).indexOf(e.target.value.toLowerCase()) !== -1){
                filtered.push(element)
            }
        });
        setFilteredData(filtered);
    }
    return (
        <div>
            
                <Flex column>
                   <StackHeader>
                        <Flex justifyBetween>
                            <BackIcon onClick={onBack}  height={20} width={20}/> 
                            {/* <ShareIcon height={20} width={20}/> */}
                        </Flex>
                    </ StackHeader>
                <RestoDetails>
                    <StoreImage src={restaurant && restaurant.image}/>
                    {
                        restaurant
                         &&
                         <RestoInfoCard>
                            <div className='title'>{restaurant.name}</div>
                            <div className='address'>{restaurant.address}</div>
                        </RestoInfoCard>
                    }
                </RestoDetails>
                <ProductSearcWrapper>
                    <ProductSearch value={search} clearSearcj={()=>{setSearch('')}} placeholder='Search food' onChange={onProductSearch}/>
                </ProductSearcWrapper>
                
                {/* <Categories>
                    <CategoriesTitle>Top Categories</CategoriesTitle>
                    <CateogryWrapper>
                        
                        {
                        productsData &&  [...new Set(productsData.map(item => item.category))].map(category=>(
                            <Category>{category}</Category>
                            ))
                        }
                    </CateogryWrapper>
                </Categories> */}
               
                <ProductList restaurant={restaurant} productsData={search!==''?filteredData:productsData}/>
                    
               
                </Flex>
            
            <BottomTab/>
            
        </div>
    )
}

const Categories = styled.div`
    background: #fff;
    /* color: #ffff; */
    padding-left: 1rem;
    padding-top: 1rem;
`
const CategoriesTitle = styled.div`
    font-size:1rem;
    font-weight:800;
    color:#333;
`
const CateogryWrapper = styled.div`
    display:flex;
    overflow-x: scroll;

`
const Category = styled.div`
    margin:0.5rem;
    white-space:nowrap;
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