import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import {
  GeneralSettingsResponseSuccess,
  UpdateAccountRequest,
  UpdatePasswordRequest,
} from '@/types'

export const getGeneralSettings = (token: string) => {
  return axiosInstance.get(apiRoute.settings.getGeneralSettings, {
    headers: {
      Authorization: token,
    },
  })
}

export const updateGeneralSettings = (token: string, request: GeneralSettingsResponseSuccess) => {
  return axiosInstance.put(apiRoute.settings.getGeneralSettings, request, {
    headers: {
      Authorization: token,
    },
  })
}

export const updateAccountSettings = (token: string, request: UpdateAccountRequest) => {
  return axiosInstance.put(apiRoute.settings.updateAccountSettings, request, {
    headers: {
      Authorization: token,
    },
  })
}

export const updatePassword = (token: string, request: UpdatePasswordRequest) => {
  return axiosInstance.put(apiRoute.settings.updatePassword, request, {
    headers: {
      Authorization: token,
    },
  })
}
