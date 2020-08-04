import axios from 'axios'
import { baseUrl } from '../helpers/constants';

const ax = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type':'application/json'}
  });
  
 const editCategory = (body)=>{

    return ax.post(`/v1/api/edit_category`)

}

const editSubCategory = (body)=>{
    
    return ax.get(`/v1/api/edit_subcategory`)

}


export default { editCategory, editSubCategory}