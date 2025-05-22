import axios from 'axios'
import { ACCESS_TOKEN, HOST_URL } from '../constants/Constants'


const api = axios.create({
    baseURL:HOST_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } return config},
        (error) =>{
            return Promise.reject(error)
    }
)

export default api;