import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { resetSignUpRequest } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getInChatRoom, getOutChatRoom } from '@/services'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Modal403 } from '../modals'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [cookies] = useCookies([DEVICE_ID, USER_ID])
  const [chatStatus, setChatStatus] = useState<string>('out')

  const dispatch = useDispatch()

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const outChatRoom = useApiCall({
    callApi: () =>
      getOutChatRoom(generateToken({ userId: cookies.userId, deviceId: cookies.deviceId })),
  })

  const inChatRoom = useApiCall({
    callApi: () =>
      getInChatRoom(generateToken({ userId: cookies.userId, deviceId: cookies.deviceId })),
  })

  useEffect(() => {
    const onClose = () => {
      if (cookies.userId && cookies.deviceId) {
        outChatRoom.setLetCall(true)
      }
    }

    onClose()

    window.addEventListener('beforeunload', onClose)

    return () => {
      window.removeEventListener('beforeunload', onClose)
    }
  }, [])

  useEffect(() => {
    if (router.asPath.includes('chat') && cookies.deviceId && cookies.userId) {
      if (chatStatus !== 'in') {
        inChatRoom.setLetCall(true)
        setChatStatus('in')
      }
    } else if (chatStatus !== 'out') {
      outChatRoom.setLetCall(true)
      setChatStatus('out')
    }
  }, [cookies, router])

  useEffect(() => {
    if (
      router &&
      !router.asPath.includes('login') &&
      !router.asPath.includes('forgot-password') &&
      !router.asPath.includes('sign-up') &&
      !router.asPath.includes('verify')
    ) {
      if (!cookies.deviceId && !cookies.userId) {
        router.push('/login')
      }
    }
    if (
      (router && router.asPath.includes('login')) ||
      router.asPath.includes('forgot-password') ||
      router.asPath.includes('sign-up') ||
      router.asPath.includes('verify')
    ) {
      if (cookies.deviceId && cookies.userId) {
        router.push('/')
      }
      dispatch(resetSignUpRequest())
    }
  }, [router, cookies])

  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        theme={darkTheme ? 'dark' : 'light'}
        style={{ zIndex: 1000000 }}
      />
      <Modal403 />
      {children}
    </>
  )
}
