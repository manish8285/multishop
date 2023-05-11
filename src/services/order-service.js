import { getCurrentUserDetail } from "../auth"
import { BASE_URL, myAxios, privateAxios } from "./helper"

export const SaveCustomerAddress=(address)=>{
    let url = BASE_URL+`customer/address/${getCurrentUserDetail().id}`
    return privateAxios.post(url,address).then(response=>response.data)
}

export const PlaceOrderRequest=(order)=>{
    let url=BASE_URL+`customer/order/${getCurrentUserDetail().id}`
    return privateAxios.post(url,order).then(response=>response.data)
}

export const addPrescription=(order)=>{
    let url=BASE_URL+`order/${getCurrentUserDetail().id}`
    return privateAxios.post(url,order).then(response=>response.data)
}

export const addPrescriptionImage=(ordereId,prescription)=>{
    // privateAxios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
     return privateAxios.post(`order/image/${ordereId}`,prescription,{
         headers: {
           'Content-Type': 'multipart/form-data'
         },
     }).then(response=>response.data)
 }

export const GetMyOrders=(pageNumber,pageSize=5)=>{
    let url=BASE_URL+`customer/order/myorders/${getCurrentUserDetail().id}/?pageNumber=${pageNumber}&pageSize=${pageSize}`
    return privateAxios.get(url).then(response=>response.data)
}

export const GetMyOrderStatus=(orderId)=>{
    let url=BASE_URL+`customer/status/order`
    return privateAxios.get(url).then(response=>response.data)
}

export const GetMyDeliveryCharge=(pincode,weight=0.4,amount=0,type="prepaid")=>{
    let url=`auth/delivery/${pincode}?weight=${weight}&amount=${amount}&type=${type}`
    return myAxios.get(url).then(response=>response.data)
}

export const CalculateShippingCharge=(delivery_postcode,weight="0.5",cod=0,mode="Surface")=>{
    let url=`auth/shipping/${delivery_postcode}?weight=${weight}&cod=${cod}&mode=${mode}`
    return myAxios.get(url).then(response=>response.data)
}

export const GetMyOrderById=(orderId)=>{
    let url=BASE_URL+`customer/myorder/order/${orderId}`
    return privateAxios.get(url).then(response=>response.data)
}