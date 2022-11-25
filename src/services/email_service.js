import { myAxios } from "./helper"

export const sendEmail=(emailDto)=>{
    return myAxios.post("contact/us",emailDto).then(respone=>respone.data)
}