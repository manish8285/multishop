import { getCurrentUserDetail } from "../auth"
import { BASE_URL, myAxios, privateAxios } from "./helper"

export const CreateAppointment=(appointment)=>{
    let url=BASE_URL+`appointment/`
    return privateAxios.post(url,appointment).then(response=>response.data)
}

export const UpdateAppointment=(appointment)=>{
    let url=BASE_URL+`appointment/`
    return privateAxios.put(url,appointment).then(response=>response.data)
}