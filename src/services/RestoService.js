import axios from 'axios'
import { baseUrl } from '../helpers/constants';

const ax = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type':'application/json'}
  });
  
 const getOrders = (body)=>{
    const {id} = body;
    return ax.get(`/v1/api/restaurant_order_history?restaurant_id=${id}`)
}

const acceptOrder = (body)=>{
    return ax.post(`/v1/api/update_order_status`,body)
}

const cancelOrder = (body)=>{
    return ax.post(`/v1/api/update_order_status`,body);
}
// const getStoreRestos = (body)=>{
//     const {store_id}=body;
//     return ax.get(`/v1/api/fetch_store_wise_restaurants?store_id=${store_id}`)
// }

// const placeOrder = (body)=>{
//     return ax.post(`/v1/api/place_order`,body);
// }
export default {getOrders, acceptOrder}