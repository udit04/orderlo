import React,{useState,useEffect} from 'react'
import ProductList from '../src/components/ProductList';
import SimpleSlider from '../src/components/Slider';
import Header from '../src/components/Header';
import Sidebar from '../src/components/Sidebar';
import  Flex  from 'styled-flex-component';
import styled from 'styled-components'
import productService from '../src/services/productService';
export default function Store() {
    const [sidebar, setsidebar] = useState(false);
    const [productsData, setproductsData] = useState(null)
    const [restaurant, setrestaurant] = useState(null)
    useEffect(() => {
        
        productService.getRestoProducts({id:1}).then(res=>{
            if(res.status===200){
                console.log(res.data)
                setproductsData(res.data.products);
                setrestaurant(res.data.restaurant);
            }else{

            }
        }).catch(err=>{
            console.log(err);
        })
        return () => {
        }
    }, [])
    return (
        <div>
            <StoreWrapper className={sidebar?'sidebar-active':''}>
                <Flex column>
                <Header toggleSidebar={()=>{setsidebar(!sidebar)}}/>
                <SimpleSlider/>
                <div>
                    
                    <ProductList restaurant={restaurant} productsData={productsData}/>
                    
                </div>
                </Flex>
            </StoreWrapper>
            <Sidebar />
        </div>
    )
}

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
