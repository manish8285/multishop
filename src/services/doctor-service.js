import { myAxios, privateAxios } from "./helper"

export const customerToDoctor=()=>{
    return privateAxios.post("/customer/update_doctor").then(response=>response.data)
}

export const registerNewDoctor=(doctor)=>{
    return privateAxios.post("/doctor/register",doctor).then(response=>response.data)
}

export const getAllSpecializations=()=>{
    return privateAxios.get("users/specializations").then(response=>response.data)
}
export const getDoctor=(drId)=>{
    return privateAxios.get("customer/doctor/"+drId).then(response=>response.data)
}
export const getAllDoctors=(pageNo=0,pagSize=5,specialization=-1)=>{
    const url = `customer/doctors?pageNo=${pageNo}&pageSize=${pagSize}&specialization=${specialization}`
    return privateAxios.get(url).then(response=>response.data)
}

export const createAppointment=(appointment)=>{
    return privateAxios.post("customer/bok_appointment",appointment).then(response=>response.data)
}

export const getAllAppointments=(pageNo=0,pagSize=5)=>{
    const url = `customer/myappointments?pageNumber=${pageNo}&pageSize=${pagSize}`
    return privateAxios.get(url).then(response=>response.data)
}