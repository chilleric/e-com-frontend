import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import { QueryParams } from '@/types/common'

export const getListFeature = (token: string, params?: QueryParams) => {
  return axiosInstance.get(apiRoute.feature.getFeatureList, {
    params,
    headers: {
      Authorization: token,
    },
  })
}

export const changeStatusFeature = (token: string, id: string) => {
  return axiosInstance.put(apiRoute.feature.changeStatusFeature, null, {
    headers: {
      Authorization: token,
    },
    params: {
      id,
    },
  })
}
