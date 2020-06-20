import React,{useState,useEffect} from 'react'
import ProductList from '../../src/components/ProductList';
import SimpleSlider from '../../src/components/Slider';
import Header from '../../src/components/Header';
import Sidebar from '../../src/components/Sidebar';
import  Flex  from 'styled-flex-component';
import styled from 'styled-components'
import productService from '../../src/services/productService';
import BottomTab from '../../src/components/BottomTab';
import { useRouter } from 'next/router';
export default function Restaurant(props) {
    const [sidebar, setsidebar] = useState(false);
    const [productsData, setproductsData] = useState(null)
    const [restaurant, setrestaurant] = useState(null)
    const router = useRouter();
    const { res_id } = router.query
    useEffect(() => {
        if(res_id)
        {
            productService.getRestoProducts({id:res_id}).then(res=>{
                if(res.status===200){
                    console.log(res.data)
                    setproductsData(res.data.products);
                    setrestaurant(res.data.restaurant);
                }else{
                    
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [res_id])
    return (
        <div>
            <StoreWrapper className={sidebar?'sidebar-active':''}>
                <Flex column>
                <Header toggleSidebar={()=>{setsidebar(!sidebar)}}/>
                <StoreImage src={restaurant && restaurant.image}/>
                <Categories>
                    <CategoriesTitle>Top Categories</CategoriesTitle>
                    <CateogryWrapper>
                        {
                        productsData &&  [...new Set(productsData.map(item => item.category))].map(category=>(
                            <Category>{category}</Category>
                            ))
                        }
                    </CateogryWrapper>
                </Categories>
                <div>
                    
                    <ProductList restaurant={restaurant} productsData={productsData}/>
                    
                </div>
                </Flex>
            </StoreWrapper>
            <BottomTab/>
            <Sidebar />
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
    max-height:200px;
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
