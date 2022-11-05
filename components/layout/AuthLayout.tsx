import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { resetSignUpRequest, GeneralSettingsSelector } from '@/redux'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Modal403 } from '../modals'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [cookies] = useCookies([DEVICE_ID, USER_ID])

  const dispatch = useDispatch()

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  useEffect(() => {
    if (
      router &&
      !router.asPath.includes('login') &&
      !router.asPath.includes('forgot-password') &&
      !router.asPath.includes('sign-up')
    ) {
      if (!cookies.deviceId && !cookies.userId) {
        router.push('/login')
      }
    }
    if (
      (router && router.asPath.includes('login')) ||
      router.asPath.includes('forgot-password') ||
      router.asPath.includes('sign-up')
    ) {
      if (cookies.deviceId && cookies.userId) {
        router.push('/')
      }
      dispatch(resetSignUpRequest())
    }
  }, [router, cookies])

  return (
    <>
      <ToastContainer theme={darkTheme ? 'dark' : 'light'} style={{ zIndex: 1000000 }} />
      <Modal403 />
      {children}
    </>
  )
}
