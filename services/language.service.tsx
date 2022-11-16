import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import { AddNewLanguageRequest, DictionaryKey, LanguageRequest } from '@/types'
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

export const addNewLanguage = (token: string, request: AddNewLanguageRequest) => {
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

export const addNewDictionary = (token: string, request: DictionaryKey) => {
  return axiosInstance.post(apiRoute.language.addNewDictionary, request, {
    headers: {
      Authorization: token,
    },
  })
}

export const deleteDictionaryKey = (token: string, key: string) => {
  return axiosInstance.put(apiRoute.language.deleteDictionaryKey, undefined, {
    headers: {
      Authorization: token,
    },
    params: { key },
  })
}
