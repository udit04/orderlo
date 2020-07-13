import React,{useState,useEffect} from 'react'
import ProductList from '../ProductList';
import productService from '../../services/productService';
import { CollectionName } from '../../../pages/restaurant/[res_id]';
import styled from 'styled-components'
function RestoMenu(props) {
    // const {res_id} = props;
    const {res_id} = props;
    const [collections, setCollections] = useState([]);
    const [productsData,setProductsData] = useState([]);
    const [restaurant,setRestaurant] = useState(null);
    useEffect(() => {
        if(res_id)
        {
            productService.getRestoProducts({id:res_id}).then(res=>{
                if(res.status===200){
                    console.log(res.data)
                    setProductsData(res.data.products);
                    const collectionsData =  res.data.products.reduce(function (accumulator, element) {
                        accumulator[element.category] = accumulator[element.category] || [];
                        accumulator[element.category].push(element);
                        return accumulator;
                    }, Object.create(null));
                    // console.log(Array.isArray(collectionsData));
                    let collectionsNew = []

                    for (const key in collectionsData) {
                        console.log(key,collectionsData[key]);
                        collectionsNew.push({
                            name:key,
                            products:[...collectionsData[key]]
                        })
                    }
                    setCollections(collectionsNew);
                    setRestaurant(res.data.restaurant);
                    // setCollections(collectionsData);
                }else{
                    
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [])
    console.log(productsData);

    return (
        <RestaurantMenuWrapper>
            <div className='menuHeader'> Menu</div>
            {(collections).map(collection=>{
                    return(
                        <>
                        <CollectionName id={collection.name}>{collection.name}</CollectionName>
                        <ProductList restaurant={restaurant} dashboard={true} productsData={collection.products}/>
                        </>
                        
                    )
                })}
        </RestaurantMenuWrapper>
    )
}

export default RestoMenu

const RestaurantMenuWrapper= styled.div`
    width:100%;
    flex:1;
    padding:1rem;
    .menuHeader{
        font-size:1.25rem;
        padding:1rem;
        font-weight:800;
    }
`