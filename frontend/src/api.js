import axios from "axios"
import { BASE_URL, ACCESS_TOKEN } from "./utils/constants";

const api = axios.create({
    baseURL: `${BASE_URL}api/`
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config

}, (error) => {
    return Promise.reject(error)
}
)

export default api;
