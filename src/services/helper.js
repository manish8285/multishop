import axios from 'axios'

export const BASE_URL = "https://multimshop.herokuapp.com/api/v1/"
//export const BASE_URL = "http://localhost:8080/api/v1/"

export const DRIVE_IMAGE_URL = "https://drive.google.com/uc?export=view&id="

export const myAxios = axios.create({
    baseURL:BASE_URL
})