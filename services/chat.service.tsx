import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'

export const getInChatRoom = (userId: String) => {
  return axiosInstance.post(apiRoute.message.toChatRoom, null, {
    params: {
      id: userId,
    },
  })
}

export const getOutChatRoom = (userId: String) => {
  return axiosInstance.post(apiRoute.message.outChatRoom, null, {
    params: {
      id: userId,
    },
  })
}
