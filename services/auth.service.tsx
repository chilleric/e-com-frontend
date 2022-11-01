import { apiRoute } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios/request';
import { LoginRequest } from '@/types/auth';

export const login = (request: LoginRequest) => {
  const response = axiosInstance.post(apiRoute.auth.login, request);
  return response;
};
