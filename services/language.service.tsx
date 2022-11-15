import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import { QueryParams } from '@/types/common'
import { PermissionRequest } from '@/types/permission'

export const getLanguageSelectList = (token: string, params?: QueryParams) => {
  return axiosInstance.get(apiRoute.language.getLanguageSelectList, {
    params,
    headers: {
      Authorization: token,
    },
  })
}

export const getLanguageList = (token: string, params?: QueryParams) => {
  return axiosInstance.get(apiRoute.language.getLanguageList, {
    params,
    headers: {
      Authorization: token,
    },
  })
}

export const getLanguageByKey = (token: string, params?: QueryParams) => {
  return axiosInstance.get(apiRoute.language.getLanguageByKey, {
    params,
    headers: {
      Authorization: token,
    },
  })
}

export const getDefaultDictionary = (token: string, params?: QueryParams) => {
  return axiosInstance.get(apiRoute.language.getDefaultDictionary, {
    params,
    headers: {
      Authorization: token,
    },
  })
}

export const addNewLanguage = (token: string, request: PermissionRequest) => {
  return axiosInstance.post(apiRoute.language.addNewLanguage, request, {
    headers: {
      Authorization: token,
    },
  })
}

export const updateLanguage = (id: string, token: string, request: PermissionRequest) => {
  return axiosInstance.put(apiRoute.language.updateLanguage, request, {
    headers: {
      Authorization: token,
    },
    params: {
      id,
    },
  })
}
