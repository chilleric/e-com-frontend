import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://e-com-api-dev.herokuapp.com',
});

axiosInstance.interceptors.request.use((config) => {
  return { ...config };
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
