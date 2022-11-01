import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  return { ...config };
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response) return Promise.reject(error.response);
  },
);

export default axiosInstance;
