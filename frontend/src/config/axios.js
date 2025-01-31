import axios from 'axios'

export default axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}`,
})