import axios from 'axios'
import { baseUrl } from '../helpers/constants';

const ax = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type':'application/json'}
  });
  
 const getOrders = (body)=>{
    const {id,user_id} = body;
    let qs = [];
    if(id){
        qs.push(`restaurant_id=${id}`)
    }
    if(user_id){
        qs.push(`user_id=${user_id}`)
    }
    qs = qs.join("&");
    return ax.get(`/v1/api/restaurant_order_history?${qs}`)
}

const getBillDetails = (body)=>{
    const {order_id} = body;
    return ax.get(`/v1/api/fetch_order_bill_details?order_id=${order_id}`)
}

const acceptOrder = (body)=>{
    return ax.post(`/v1/api/update_order_status`,body)
}
// const getStoreRestos = (body)=>{
//     const {store_id}=body;
//     return ax.get(`/v1/api/fetch_store_wise_restaurants?store_id=${store_id}`)
// }

// const placeOrder = (body)=>{
//     return ax.post(`/v1/api/place_order`,body);
// }
export default {getOrders, acceptOrder, getBillDetails}