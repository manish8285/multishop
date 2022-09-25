import axios from 'axios'

export const BASE_URL = "https://multimshop.herokuapp.com/api/v1/"

export const myAxios = axios.create({
    baseURL:BASE_URL
})