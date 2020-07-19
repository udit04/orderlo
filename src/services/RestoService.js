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
const generateBill = (body)=>{
    return ax.post(`/v1/api/generate_bill`,body);
}
export default {getOrders, acceptOrder, generateBill}