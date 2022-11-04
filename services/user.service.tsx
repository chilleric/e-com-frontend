import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import { UserRequest } from '@/types'

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

export const addNewUser = ({ user, token }: { user: UserRequest; token: string }) => {
  return axiosInstance.post(apiRoute.user.addNewUser, user, {
    headers: {
      Authorization: token,
    },
  })
}

export const updateUser = ({
  id,
  user,
  token,
}: {
  id: string
  user: UserRequest
  token: string
}) => {
  return axiosInstance.put(apiRoute.user.updateUser, user, {
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
