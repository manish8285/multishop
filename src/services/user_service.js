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

export const signUp=(user)=>{
  return  myAxios.post("auth/signup",user).then((response)=>response.data);
}

export const login=(loginDetail)=>{
  return myAxios.post("auth/login",loginDetail).then((response)=>response.data);
}

export const sendOTP=(email)=>{
  return myAxios.get(`auth/sendOTP/${email}`).then((response)=>response.data);
}
export const verifyEmailUnique=(email)=>{
  return myAxios.get(`auth/checkEmail?email=${email}`).then((response)=>response.data);
}

export const verifyOTP=(otp)=>{
  return myAxios.get(`auth/verifyOTP/${otp}`).then((response)=>response.data);
}
export const resetPassword=(email,password,otp)=>{
  return myAxios.post(`auth/resetPassword?email=${email}&password=${password}&otp=${otp}`).then((response)=>response.data);
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