import { privateAxios } from "./helper"

export const requestSelfPayment=(orderId)=>{
    return privateAxios.post(`payments/self_order_request?orderId=${orderId}`).then(response=>response.data)
}

export const getSelfPayment=(paymentId)=>{
    return privateAxios.get(`payments/self_payment?paymentId=${paymentId}`).then(response=>response.data)
}

export const makeSelfPayment=(paymentId,recipt)=>{
   // privateAxios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    return privateAxios.post(`payments/self_order_payment`,recipt,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
    }).then(response=>response.data)
}