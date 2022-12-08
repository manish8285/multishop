import axios from 'axios'
import { getToken } from '../auth'

//export const BASE_URL = "https://multimshop.herokuapp.com/api/v1/"
export const BASE_URL = "http://localhost:8080/api/v1/"

//export const BASE_URL = "http://34.131.250.126:8080/api/v1/"

export const DRIVE_IMAGE_URL = "https://drive.google.com/uc?export=view&id="

export const myAxios = axios.create({
    baseURL:BASE_URL
})

export const privateAxios = axios.create({
    baseURL:BASE_URL
   // withCredentials:false
})

privateAxios.interceptors.request.use(config=>{
    const token = getToken()
    if(token){
        config.headers.common.Authorization=`Bearer ${token}`
        return config
    }
},error=>Promise.reject(error))

// /etc/systemd/system        multishop.service

//systemctl enable multishop
//systemctl start multishop
//systemctl stop multishop