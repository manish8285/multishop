import { getCurrentUserDetail } from "../auth"
import { BASE_URL, privateAxios } from "./helper"

export const SaveCustomerAddress=(address)=>{
    let url = BASE_URL+`customer/address/${getCurrentUserDetail().id}`
    return privateAxios.post(url,address).then(response=>response.data)
}

export const PlaceOrderRequest=(order)=>{
    let url=BASE_URL+`customer/order/${getCurrentUserDetail().id}`
    return privateAxios.post(url,order).then(response=>response.data)
}

export const GetMyOrders=(pageNumber,pageSize=5)=>{
    let url=BASE_URL+`customer/order/myorders/${getCurrentUserDetail().id}/?pageNumber=${pageNumber}&pageSize=${pageSize}`
    return privateAxios.get(url).then(response=>response.data)
}

export const GetMyOrderStatus=(orderId)=>{
    let url=BASE_URL+`customer/status/order`
    return privateAxios.get(url).then(response=>response.data)
}

export const GetMyOrderById=(orderId)=>{
    let url=BASE_URL+`customer/myorder/order/${orderId}`
    return privateAxios.get(url).then(response=>response.data)
}