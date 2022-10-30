import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  return { ...config };
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response.data),
  (error) => {
    if (error.response) return Promise.reject(error.response);
  }
);

export default axiosInstance;
