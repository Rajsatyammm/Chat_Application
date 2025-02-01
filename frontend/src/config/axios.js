import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api`,
    withCredentials: true
})

export default axiosInstance;