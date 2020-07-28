import axios from 'axios'
import { baseUrl } from '../helpers/constants';

const ax = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type':'application/json'}
  });
  
const loginResto = (body)=>{
    const {username,password}=body;
     return ax.post(`/v1/api/restaurant_login`,
        {
            username,
            password
        }
    )
}

const signupResto = (body)=>{
    const {username,password,email,name} = body;
    return ax.post(`/v1/api/create_restaurant`,
        {
            username,
            password,
            email,
            name,
        }
    )
}

const getRestoByName = (body)=>{
    return ax.get(`/v1/api/get_restaurant_by_name?restaurant_name=${body.name}`)
}

export const RestoLoginService  = {signupResto, loginResto,getRestoByName};
