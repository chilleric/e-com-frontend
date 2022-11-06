import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'

export const getListFeature = (token: string) => {
  return axiosInstance.get(apiRoute.feature.getFeatureList, {
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
