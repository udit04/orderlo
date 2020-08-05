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

const fetchCategories = (body)=>{ 
    return ax.get(`/v1/api/fetch_categories?restaurant_id=${body.restaurant_id}`)
}

const fetchSubCategories = (body)=>{ 
    return ax.get(`/v1/api/fetch_subcategories?restaurant_id=${body.restaurant_id}&category_id=${body.category_id}`)
}

const createCategory = (body)=>{
    return ax.post(`/v1/api/create_category`,{...body})
}

const createSubCategory = (body)=>{
    return ax.post(`/v1/api/create_subcategory`,{...body})
}


export default { editCategory, editSubCategory, fetchCategories, fetchSubCategories, createCategory,createSubCategory}