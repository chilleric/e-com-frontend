import { OptionsType } from '@/types'

export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString('base64')
}

export const encodeBase64Url = (data: string) => {
  return Buffer.from(data).toString('base64url')
}

export const decodeBase64 = (data: string) => {
  return Buffer.from(data, 'base64').toString('ascii')
}
const jwt = require('jsonwebtoken')

export const generateToken = (content: { userId: string; deviceId: string }) => {
  const contentJwt = {
    ...content,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000 + 60 * 60),
  }

  const token = jwt.sign(contentJwt, process.env.NEXT_PUBLIC_SECRET_JWT_KEY || '', {
    algorithm: 'HS512',
  })

  return `Bearer ${token}`
}

export const convertValueToLabel = <T,>(value: T, list: OptionsType<T>[]) => {
  return list.find((item) => item.value === value)?.label ?? ''
}
