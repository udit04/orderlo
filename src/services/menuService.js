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

const editProduct = (body)=>{ 
    return ax.post(`/v1/api/edit_product`,body)
}

const fetchCategories = (body)=>{ 
    return ax.get(`/v1/api/fetch_categories?restaurant_id=${body.restaurant_id}`)
}

const fetchSubCategories = (body)=>{ 
    return ax.get(`/v1/api/fetch_subcategories?restaurant_id=${body.restaurant_id}&category_id=${body.category_id}`)
}

const fetchProducts = (body)=>{ 
    return ax.get(`/v1/api/fetch_restaurant_products?restaurant_id=${body.restaurant_id}`)
}

const createCategory = (body)=>{
    return ax.post(`/v1/api/create_category`,{...body})
}

const createSubCategory = (body)=>{
    return ax.post(`/v1/api/create_subcategory`,{...body})
}

const createProduct = (body)=>{
    return ax.post(`/v1/api/create_product`,{...body})
}

const editRestaurant = (body)=>{
    return ax.post(`/v1/api/edit_restaurant`,{...body})
}


export default { editCategory, editSubCategory, fetchCategories, fetchSubCategories, createCategory,createSubCategory, fetchProducts,createProduct,editProduct, editRestaurant}