import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import { LanguageRequest } from '@/types'
import { QueryParams } from '@/types/common'

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

export const getDefaultDictionary = (token: string) => {
  return axiosInstance.get(apiRoute.language.getDefaultDictionary, {
    headers: {
      Authorization: token,
    },
  })
}

export const addNewLanguage = (token: string, request: LanguageRequest) => {
  return axiosInstance.post(apiRoute.language.addNewLanguage, request, {
    headers: {
      Authorization: token,
    },
  })
}

export const updateLanguage = (id: string, token: string, request: LanguageRequest) => {
  return axiosInstance.post(apiRoute.language.updateLanguage, request, {
    headers: {
      Authorization: token,
    },
    params: {
      id,
    },
  })
}
