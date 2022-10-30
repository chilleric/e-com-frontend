import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-com-api-dev.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  async (error) => {
    if (error.reponse) return Promise.reject(error.reponse);
    // return Promise.reject(error);
  }
);

export default axiosInstance;
