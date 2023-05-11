import { getCurrentUserDetail, getToken } from "../auth";
import { myAxios, privateAxios } from "./helper"

export const updateLocalUser=(user)=>{
  const token = getToken()
  const data ={
    "token":token,
    "user":user
  }
  localStorage.setItem("data",JSON.stringify(data))
}

export const signUp=(user,otp)=>{
  console.log(otp)
  return  myAxios.post(`auth/signup/${otp}`,user).then((response)=>response.data);
}

export const login=(loginDetail)=>{
  return myAxios.post("auth/login",loginDetail).then((response)=>response.data);
}

export const sendOTP=(email)=>{
  return myAxios.get(`auth/sendOTP/${email}`).then((response)=>response.data);
}

export const sendMobileOTP=(mobileNo)=>{
  return myAxios.get(`auth/send_mobile_otp/${mobileNo}`).then((response)=>response.data);
}

//verify user name is unique (mobileno)
export const verifyEmailUnique=(email)=>{
  return myAxios.get(`auth/checkEmail?email=${email}`).then((response)=>response.data);
}

export const verifyOTP=(otp)=>{
  return myAxios.get(`auth/verifyOTP/${otp}`).then((response)=>response.data);
}
export const resetPassword=(mobile,password,otp)=>{
  return myAxios.post(`auth/resetPassword?mobile=${mobile}&password=${password}&otp=${otp}`).then((response)=>response.data);
}

export const getCustomer=()=>{
  const userId=getCurrentUserDetail()?.id
  const url = `customer/${userId}`
  return privateAxios.get(url).then((response)=>response.data);
}
export const updateUser=(user)=>{
  const userId=getCurrentUserDetail()?.id
  const url = `customer/user/${userId}`
  return privateAxios.put(url,user).then((response)=>response.data);
}