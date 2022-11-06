import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import { PermissionRequest } from '@/types'

export const getListPermission = (token: string) => {
  return axiosInstance.get(apiRoute.permissions.getListPermission, {
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

export const updatePermission = (token: string, request: PermissionRequest) => {
  return axiosInstance.put(apiRoute.permissions.updatePermission, request, {
    headers: {
      Authorization: token,
    },
  })
}

export const deletePermission = (token: string, id: string) => {
  return axiosInstance.put(apiRoute.permissions.updatePermission, null, {
    headers: {
      Authorization: token,
    },
    params: {
      id,
    },
  })
}
