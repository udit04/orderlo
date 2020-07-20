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
import SkeletonLoader from '../../src/components/SkeletonLoader';
export default function Restaurant(props) {
    const [sidebar, setsidebar] = useState(false);
    const [productsData, setproductsData] = useState(null)
    const [filteredData,setFilteredData] = useState([]);
    const [collections,setCollections] = useState([]);
    const [restaurant, setrestaurant] = useState(null)
    const [store,setStore] = useState(null);
    const router = useRouter();
    const { res_id } = router.query;
    const [search,setSearch ] = useState('');
    const [cartProducts,setCartProducts]= useState([]);
    const [activeCollection,setActiveCollection] = useState('');
    useEffect(() => {
        const cartData = JSON.parse(window.localStorage.getItem('cartData'));
        if(cartData){
            if(cartData.store){
                console.log(cartData.store,'___store');
                setStore(cartData.store);
            }
        }
        
    }, [])
    useEffect(()=>{
        if(activeCollection!=='' && document.getElementById(activeCollection))
        document.getElementById(activeCollection).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    },[activeCollection])
    useEffect(() => {
        if(res_id)
        {
            productService.getRestoProducts({id:res_id}).then(res=>{
                if(res.status===200){
                    console.log(res.data.menu[0]['products'])
                    setproductsData(res.data.menu);

                    // const collectionsData =  res.data.products.reduce(function (accumulator, element) {
                    //     accumulator[element.category] = accumulator[element.category] || [];
                    //     accumulator[element.category].push(element);
                    //     return accumulator;
                    // }, Object.create(null));
                    // console.log(Array.isArray(collectionsData));
                    // let collectionsNew = []

                    // for (const key in collectionsData) {
                    //     console.log(key,collectionsData[key]);
                    //     collectionsNew.push({
                    //         name:key,
                    //         products:[...collectionsData[key]]
                    //     })
                    // }
                    // setCollections(collectionsNew);
                    setrestaurant(res.data.restaurant);
                    // setCollections(collectionsData);
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

    const activateCollection = (e)=>{
        setActiveCollection(e.target.innerText);
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
                    <ProductSearch value={search} clearSearch={()=>{setSearch('')}} placeholder='Search food' onChange={onProductSearch}/>
                </ProductSearcWrapper>
                
                <Categories>
                    {/* <CategoriesTitle>Top Categories</CategoriesTitle> */}
                    <CateogryWrapper>
                        {   productsData && search!==''
                                ?
                            productsData.map(collection=>{
                                return(
                                    <>{
                                        collection.products.filter(p=>(p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)).length>0
                                        &&
                                        <Category className={activeCollection===collection.name?'active':''} onClick={activateCollection} >{collection.name}</Category>
                                        }
                                    
                                    {
                                        collection.subCategory.map(coll=>{
                                            return(
                                                <>
                                                {
                                                    coll.products.filter(p=>(p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)).length>0
                                                        &&
                                                    <Category className={activeCollection===collection.name?'active':''} onClick={activateCollection}   >{coll.name}</Category>

                                                }
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
                        {   productsData && search===''
                                ?
                            productsData.map(collection=>{
                                return(
                                    <>
                                    <Category className={activeCollection===collection.name?'active':''} onClick={activateCollection}>{collection.name}</Category>
                                    {
                                        collection.subCategory.map(coll=>{
                                            return(
                                                <>
                                                <Category className={activeCollection===collection.name?'active':''} onClick={activateCollection} >{coll.name}</Category>
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
                        
                        {/* {(search!==''?filteredData:collections).map(collection=>(
                            <Category as='a' href={'#'+collection.name}>{collection.name}</Category>
                            ))
                        } */}
                    </CateogryWrapper>
                </Categories>
                {/* {(search!==''?filteredData:collections).map(collection=>{
                    return(
                        <>
                        <CollectionName id={collection.name}>{collection.name}</CollectionName>
                        <ProductList restaurant={restaurant} productsData={collection.products}/>
                        </>
                        
                    )
                })} */}
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
                            <ProductList search={search} restaurant={restaurant} productsData={collection.products}/>
                            {
                                collection.subCategory.map((coll,index)=>{
                                    return(
                                        <>
                                        {coll.products.filter(p=>(p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)).length>0
                                            &&
                                        <CollectionName id={coll.name} >{coll.name}</CollectionName>
                                        }
                                        <ProductList search={search} restaurant={restaurant} productsData={coll.products}/>
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
                            <ProductList search={search} restaurant={restaurant} productsData={collection.products}/>
                            {
                                collection.subCategory.map(coll=>{
                                    return(
                                        <>
                                        <CollectionName id={coll.name} >{coll.name}</CollectionName>
                                        <ProductList search={search} restaurant={restaurant} productsData={coll.products}/>
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
            
            <BottomTab/>
            
        </div>
    )
}

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
    border-bottom: 1px solid #eeeeee;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* Chrome/Safari/Webkit */
    }

`
const Category = styled.div`
    
    margin: 0.5rem;
    white-space: nowrap;
    color: #999999;
    -webkit-text-decoration: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    margin-left: 0;
    text-transform: capitalize;
    font-size: 1.25rem;
    padding: 0.5rem;
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    background: hsl(37 87% 92% / 1);
    margin-right: 1rem;
    border-radius: 5px;
    background:#fff;
    &.active{
        color: #FF9800;
        background: hsl(37 87% 92% / 1);
        font-weight: 500;
    }
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
    font-size:1.25rem;
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