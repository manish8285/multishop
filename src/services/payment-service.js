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

export const getPaymentDetail=(paymentId)=>{
    return privateAxios.post(`payment/payment/${paymentId}`).then(response=>response.data)
}

export const proceedPayment=(paymentDetail)=>{
    return privateAxios.post(`payment/payment-details`,paymentDetail).then(response=>response.data)
}

export const requestOrderPayment=(orderId)=>{
    return privateAxios.post(`payment/order/${orderId}`).then(response=>response.data)
}

export const requestAppintmentPayment=(appointmentId)=>{
    return privateAxios.post(`payment/appointment/${appointmentId}`).then(response=>response.data)
}