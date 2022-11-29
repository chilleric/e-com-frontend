import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import { QueryParams } from '@/types/common'
import { PermissionRequest } from '@/types/permission'

export const getListPermission = (token: string, params?: QueryParams) => {
  return axiosInstance.get(apiRoute.permissions.getListPermission, {
    params,
    headers: {
      Authorization: token,
    },
  })
}

export const addPermission = (token: string, request: PermissionRequest) => {
  return axiosInstance.post(apiRoute.permissions.addPermission, request, {
    headers: {
      Authorization: token,
    },
  })
}

export const updatePermission = (id: string, token: string, request: PermissionRequest) => {
  return axiosInstance.put(apiRoute.permissions.updatePermission, request, {
    headers: {
      Authorization: token,
    },
    params: {
      id,
    },
  })
}

export const deletePermission = (token: string, id: string) => {
  return axiosInstance.put(apiRoute.permissions.deletePermission, null, {
    headers: {
      Authorization: token,
    },
    params: {
      id,
    },
  })
}

export const getViewPointsSelect = (token: string, params?: QueryParams) => {
  return axiosInstance.get(apiRoute.permissions.getViewPointsSelect, {
    params,
    headers: {
      Authorization: token,
    },
  })
}

export const getDetailPermission = (token: string, id: string) => {
  return axiosInstance.get(apiRoute.permissions.getDetailPermission, {
    params: {
      id,
    },
    headers: {
      Authorization: token,
    },
  })
}
