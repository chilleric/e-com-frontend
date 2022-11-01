import { apiRoute } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios/request';

export const getListUser = () => {
  return axiosInstance.get(apiRoute.user.getListUser);
};
