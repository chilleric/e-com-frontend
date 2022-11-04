import { apiRoute } from '@/constants/apiRoutes'
import { encodeBase64 } from '@/lib'
import axiosInstance from '@/lib/axios/request'
import { UserResponseSuccess } from '@/types'

export const getListUser = (token: string) => {
  return axiosInstance.get(apiRoute.user.getListUser, {
    headers: {
      Authorization: token,
    },
  })
}

export const getDetailUser = ({ id, token }: { id: string; token: string }) => {
  return axiosInstance.get(apiRoute.user.getDetailUser, {
    headers: {
      Authorization: token,
    },
    params: {
      id,
    },
  })
}

export const addNewUser = ({ user, token }: { user: UserResponseSuccess; token: string }) => {
  const { id, password, ...body } = user
  return axiosInstance.post(apiRoute.user.addNewUser, body, {
    headers: {
      Authorization: token,
    },
  })
}

export const updateUser = ({ user, token }: { user: UserResponseSuccess; token: string }) => {
  const { id, password, ...body } = user
  return axiosInstance.put(apiRoute.user.updateUser, body, {
    headers: {
      Authorization: token,
    },
    params: {
      id,
    },
  })
}

export const changeStatusUser = ({ id, token }: { id: string; token: string }) => {
  return axiosInstance.put(apiRoute.user.changeStatus, null, {
    headers: {
      Authorization: token,
    },
    params: {
      id,
    },
  })
}
