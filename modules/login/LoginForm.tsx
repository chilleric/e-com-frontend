import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { encodeBase64 } from '@/lib'
import { toggleTheme } from '@/redux/general-settings'
import { callForgotPassword, login } from '@/services'
import { LoginResponseFailure, LoginResponseSuccess } from '@/types'
import { Button, FormElement, Input, Loading, Modal, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { inputStyles } from './login.inventory'

export const LoginForm = () => {
  const emailRef = useRef<FormElement>(null)
  const passwordRef = useRef<FormElement>(null)
  const router = useRouter()
  const [cookies, setCookie] = useCookies([DEVICE_ID, USER_ID])
  const translate = useTranslationFunction()

  const dispatch = useDispatch()

  const handleChangeTheme = () => {
    dispatch(toggleTheme())
  }

  const resultForgotPassword = useApiCall({
    callApi: () => callForgotPassword(emailRef?.current?.value || ''),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
    },
  })

  const result = useApiCall<LoginResponseSuccess, LoginResponseFailure>({
    callApi: () =>
      login({
        username: emailRef.current ? emailRef.current.value : '',
        password: encodeBase64(passwordRef.current ? passwordRef.current.value : ''),
      }),
    handleSuccess(message, data) {
      if (data.needVerify) {
        router.push('/verify?type=verifyEmail')
      }
      if (data.verify2Fa) {
        router.push(`/verify?type=verify2FA&email=${emailRef.current?.value || ''}`)
      }
      if (!data.needVerify && !data.verify2Fa) {
        toast.success(translate(message))
        setCookie(DEVICE_ID, data.deviceId, {
          path: '/',
          expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        })
        setCookie(USER_ID, data.userId, {
          path: '/',
          expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        })
        router.push('/')
      }
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const { error, loading, setLetCall, handleReset } = result

  const handleLogin = () => {
    setLetCall(true)
  }

  const handleSignUp = () => {
    router.push('/sign-up')
  }

  useEffect(() => {
    if (cookies.deviceId && cookies.userId) {
      router.push('/')
    }
  }, [cookies])

  const usernameLabel = useTranslation('username')
  const signIn = useTranslation('signIn')
  const passwordLabel = useTranslation('password')
  const signUp = useTranslation('signUp')
  const changeTheme = useTranslation('changeTheme')
  const forgotPassword = useTranslation('forgotPassword')

  return (
    <>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {signIn}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          ref={emailRef}
          {...inputStyles({ error: error?.result?.username && translate(error.result.username) })}
          labelLeft={usernameLabel}
          onFocus={handleReset}
        />
        <Input
          ref={passwordRef}
          {...inputStyles({ error: error?.result?.password && translate(error.result.password) })}
          type="password"
          labelLeft={passwordLabel}
          onFocus={handleReset}
        />
        <Row justify="flex-end">
          <Button
            disabled={loading}
            auto
            light
            onClick={() => resultForgotPassword.setLetCall(true)}
          >
            {forgotPassword}?
          </Button>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat onClick={handleChangeTheme}>
          {changeTheme}
        </Button>
        <Button disabled={loading} auto onClick={handleSignUp}>
          {signUp}
        </Button>
        <Button disabled={loading} auto onClick={handleLogin}>
          {loading ? <Loading /> : <>{signIn}</>}
        </Button>
      </Modal.Footer>
    </>
  )
}
