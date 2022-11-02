import { apiRoute } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios/request';
import { LoginRequest, SignUpRequest } from '@/types/auth';

export const login = (request: LoginRequest) => {
  return axiosInstance.post(apiRoute.auth.login, request);
};

export const singUp = (request: SignUpRequest) => {
  return axiosInstance.post(apiRoute.auth.signUp, request);
};
