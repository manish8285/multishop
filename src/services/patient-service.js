import { getCurrentUserDetail } from "../auth"
import { BASE_URL, myAxios, privateAxios } from "./helper"

export const GetAllMyPatients=()=>{
    let url=BASE_URL+`patient/`
    return privateAxios.get(url).then(response=>response.data)
}

export const AddNewPatient=(patient)=>{
    let url=BASE_URL+`patient/add`
    return privateAxios.post(url,patient).then(response=>response.data)
}

export const UpdatePatient=(patient)=>{
    let url=BASE_URL+`patient/update`
    return privateAxios.put(url,patient).then(response=>response.data)
}

export const getAllPrescriptionsOfPatient=(pageNumber,pageSize,patientId)=>{
    return privateAxios.get(`prescription/?pageNumber=${pageNumber}&pageSize=${pageSize}&patientId=${patientId}`).then(response=>response.data)
}