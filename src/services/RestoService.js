import axios from 'axios'
import { baseUrl } from '../helpers/constants';

const ax = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type':'application/json'}
  });
  
 const getOrders = (body)=>{
    const {id,user_id,order_length} = body;
    let qs = [];
    if(id){
        qs.push(`restaurant_id=${id}`)
    }
    if(user_id){
        qs.push(`user_id=${user_id}`)
    }
    if(order_length){
        qs.push(`order_length=${order_length}`)
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

const cancelOrder = (body)=>{
    return ax.post(`/v1/api/update_order_status`,body);
}
const generateBill = (body)=>{
    return ax.post(`/v1/api/generate_bill`,body);
}

export default {getOrders, acceptOrder,generateBill, getBillDetails}
