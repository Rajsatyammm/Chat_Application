import axios from 'axios'

const BASE_URL = (import.meta.env.MODE == "development")
    ? import.meta.env.VITE_SERVER_BASE_URL_DEV
    : import.meta.env.VITE_SERVER_BASE_URL_PROD;

console.log(BASE_URL);

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})

export default axiosInstance;