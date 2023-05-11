import {BASE_URL, myAxios} from './helper'

export const GetAllProducts=(pageNumber,pageSize)=>{
    const url = BASE_URL+`products/?pageNumber=${pageNumber}&pageSize=${pageSize}`
    return myAxios.get(url).then(response=>response.data)    
}
export const GetCategoryProducts=(categoryId,pageNumber=0,pageSize=5)=>{
    const url =`products/category/products/?categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    return myAxios.get(url).then(response=>response.data)    
}

export const searchProduct=(key)=>{
    const url = BASE_URL+`products/search?keyword=${key}`
    return myAxios.get(url).then(response=>response.data)
}

export const GetProductById=(productId)=>{
    const url= BASE_URL+`products/product/${productId}`
    return myAxios.get(url).then(response=>response.data)
}

export const getAllCategories=()=>{
    const url = `products/categories/`
    return myAxios.get(url).then(response=>response.data)
}