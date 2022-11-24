import { myAxios } from "./helper"

export const sendEmail=(emailDto)=>{
    return myAxios.post("contact/us").then(respone=>respone.data)
}