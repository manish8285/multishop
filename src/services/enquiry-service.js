import { myAxios } from "./helper"

export const sendEnquiry=(enquiryDto)=>{
    return myAxios.post("contact/enquiry",enquiryDto).then(respone=>respone.data)
}