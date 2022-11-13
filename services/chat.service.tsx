import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import { MessageRequest } from '@/types'

export const getInChatRoom = (token: string) => {
  return axiosInstance.post(apiRoute.message.toChatRoom, null, {
    headers: {
      Authorization: token,
    },
  })
}

export const getOutChatRoom = (token: string) => {
  return axiosInstance.post(apiRoute.message.outChatRoom, null, {
    headers: {
      Authorization: token,
    },
  })
}

export const sendMessage = (receiveId: string, token: string, payload: MessageRequest) => {
  return axiosInstance.post(apiRoute.message.sendMessage, payload, {
    params: {
      id: receiveId,
    },
    headers: {
      Authorization: token,
    },
  })
}

export const getOldMessage = (page: number, receiveId: string, token: string) => {
  return axiosInstance.get(apiRoute.message.getOldMessage, {
    params: {
      page,
      id: receiveId,
    },
    headers: {
      Authorization: token,
    },
  })
}

export const getChatRoom = (page: number, token: string) => {
  return axiosInstance.get(apiRoute.message.getChatRooms, {
    params: {
      page,
    },
    headers: {
      Authorization: token,
    },
  })
}
