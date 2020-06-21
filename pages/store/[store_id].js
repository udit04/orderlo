import React,{useState,useEffect} from 'react'
import ProductList from '../../src/components/ProductList';
import SimpleSlider from '../../src/components/Slider';
import Header from '../../src/components/Header';
import Sidebar from '../../src/components/Sidebar';
import  Flex  from 'styled-flex-component';
import styled, { keyframes } from 'styled-components'
import productService from '../../src/services/productService';
import BottomTab from '../../src/components/BottomTab';
import RestoList from '../../src/components/RestoList';
export default function Store() {
    const [sidebar, setsidebar] = useState(false);
    const [restaurantsData, setRestaurantsData] = useState(null)
    const [store, setStore] = useState(null)
    useEffect(() => {
        
        productService.getStoreRestos({store_id:1}).then(res=>{
            if(res.status===200){
                console.log(res.data)
                setRestaurantsData(res.data.restaurants);
                setStore(res.data.store);
                window.localStorage.setItem('cartData',JSON.stringify({
                    store:{...res.data.store,id:1},
                    
                }))
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
                <Header store={store} toggleSidebar={()=>{setsidebar(!sidebar)}}/>
                <StoreImage src={store && store.image}/>
                <div>
                    <RestoList store={store} restaurantsData={restaurantsData}/>
                    
                </div>
                </Flex>
            </StoreWrapper>
            {/* <BottomTab/> */}
            {sidebar && <Sidebar />}
        </div>
    )
}

const slide = keyframes`
    0%{
        background-position:100% 0;
    }
    100%{
        background-position:-100% 0;
    }

`
const StoreImage = styled.img`
    display: block;
    width: 100%;
    height: 200px;
    background: #efefef;
    background: #f6f7f8;
    border:none;
    /* background-image: -webkit-gradient(linear,left top,right top,from(#f6f7f8),color-stop(20%,#edeef1),color-stop(40%,#f6f7f8),to(#f6f7f8)); */
    background-image: linear-gradient(90deg,#f6f7f8 0,#edeef1 20%,#f6f7f8 40%,#f6f7f8);
    background-repeat: no-repeat;
    background-size: 400% 200%;
    animation : ${slide} 1s ;
    animation-iteration-count:infinite;
    /* position: absolute; */
`

const StoreWrapper = styled.div`
    position:relative;
    transform-origin: 50vw 50vh;
    transition: all 0.2s;
    z-index: 1000;
    min-height:100vh;
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
