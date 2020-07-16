import axios from 'axios'

const baseUrl = 'https://api-ordrlo.herokuapp.com'

const ax = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type':'application/json'}
  });
  
 const getRestoProducts = (body)=>{
    const {id} = body;
    return ax.get(`/v1/api/fetch_restaurant_menu?restaurant_id=${id}&for_customer=true`)
}
const getStoreRestos = (body)=>{
    const {store_id}=body;
    return ax.get(`/v1/api/fetch_store_wise_restaurants?store_id=${store_id}`)
}

const placeOrder = (body)=>{
    return ax.post(`/v1/api/place_order`,body);
}
export default {getRestoProducts,getStoreRestos,placeOrder}