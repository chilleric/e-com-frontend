import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import { LoginRequest, SignUpRequest } from '@/types/auth'

export const login = (request: LoginRequest) => {
  return axiosInstance.post(apiRoute.auth.login, request)
}

export const singUp = (request: SignUpRequest) => {
  return axiosInstance.post(apiRoute.auth.signUp, request)
}

export const verifySignUp = (email: string, code: string) => {
  return axiosInstance.post(`${apiRoute.auth.verifySignUp}?email=${email}&code=${code}`)
}

export const resendVerifySignUp = (email: string) => {
  return axiosInstance.post(`${apiRoute.auth.verifySignUp}/resend?email=${email}`)
}

export const logout = (deviceId: string, token: string) => {
  return axiosInstance.post(`${apiRoute.auth.logout}?deviceId=${deviceId}`, null, {
    headers: {
      Authorization: token,
    },
  })
}

export const Verify2FA = (email: string, code: string) => {
  return axiosInstance.post(`${apiRoute.auth.verify2FA}?email=${email}&code=${code}`)
}

export const resendVerify2FA = (email: string) => {
  return axiosInstance.post(`${apiRoute.auth.verify2FA}/resend?email=${email}`)
}

export const callForgotPassword = (email: string) => {
  return axiosInstance.post(`${apiRoute.auth.forgotPassword}?email=${email}`)
}
