import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { toggleTheme } from '@/redux/general-settings'
import { resendVerify2FA, resendVerifySignUp, Verify2FA, verifySignUp } from '@/services'
import { LoginResponseSuccess } from '@/types'
import { Button, Input, Loading, Modal, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { inputStyles } from './verify.inventory'

export const VerifyForm = () => {
  const [isCode, setIsCode] = useState<boolean>(false)
  const router = useRouter()
  const [, setCookie] = useCookies([USER_ID, DEVICE_ID])

  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const verifyLabel = useTranslation(router?.query.type === 'verify2FA' ? '2FALabel' : 'EmailLabel')
  const emailLabel = useTranslation('email')
  const codeLabel = useTranslation('codeLabel')
  const changeTheme = useTranslation('changeTheme')
  const signIn = useTranslation('signIn')
  const submit = useTranslation('submit')
  const send = useTranslation('send')
  const resend = useTranslation('resend')

  const translate = useTranslationFunction()

  const handleLogin = () => {
    router.push('/login')
  }

  const dispatch = useDispatch()

  const handleChangeTheme = () => {
    dispatch(toggleTheme())
  }

  useEffect(() => {
    if (router?.query.type === 'verify2FA') {
      setEmail(router?.query.email?.toString() || '')
      setIsCode(true)
    }
  }, [router])

  const verify2FACall = useApiCall<LoginResponseSuccess, string>({
    callApi: () => Verify2FA(email, code),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message, data) {
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
    },
  })

  const verifyEmail = useApiCall<string, string>({
    callApi: () => verifySignUp(email, code),
    handleError(status, message) {
      if (status === 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/login')
    },
  })

  const resultResendEmail = useApiCall<string, string>({
    callApi: () => resendVerifySignUp(email),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      if (message) {
        toast.success(translate(message))
        setIsCode(true)
      }
    },
  })

  const resultResend2FA = useApiCall<string, string>({
    callApi: () => resendVerify2FA(email),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      if (message) {
        toast.success(translate(message))
        setIsCode(true)
      }
    },
  })

  const handleSubmit = () => {
    if (router?.query.type === 'verify2FA') verify2FACall.setLetCall(true)
    if (router?.query.type === 'verifyEmail') verifyEmail.setLetCall(true)
  }

  const handleReset = () => {
    if (router?.query.type === 'verify2FA') verify2FACall.handleReset()
    if (router?.query.type === 'verifyEmail') verifyEmail.handleReset()
  }

  const handleResend = () => {
    if (router?.query.type === 'verify2FA') resultResend2FA.setLetCall(true)
    if (router?.query.type === 'verifyEmail') resultResendEmail.setLetCall(true)
  }

  const loading =
    resultResend2FA.loading ||
    verifyEmail.loading ||
    verify2FACall.loading ||
    resultResendEmail.loading

  return (
    <>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {verifyLabel}
        </Text>
      </Modal.Header>
      <Modal.Body>
        {!isCode ? (
          <Input
            {...inputStyles({})}
            labelLeft={emailLabel}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleReset}
          />
        ) : (
          <>
            <Input
              {...inputStyles({})}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              labelLeft={codeLabel}
              onFocus={handleReset}
            />
            <Row justify="flex-end">
              <Button
                disabled={resultResend2FA.loading || resultResendEmail.loading}
                auto
                light
                onClick={handleResend}
              >
                {resend}?
              </Button>
            </Row>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat onClick={handleChangeTheme}>
          {changeTheme}
        </Button>
        <Button disabled={loading} auto onClick={handleLogin}>
          {signIn}
        </Button>
        {isCode ? (
          <Button disabled={loading} auto onClick={handleSubmit}>
            {loading ? <Loading /> : <>{submit}</>}
          </Button>
        ) : (
          <Button disabled={loading} auto onClick={() => resultResendEmail.setLetCall(true)}>
            {loading ? <Loading /> : <>{send}</>}
          </Button>
        )}
      </Modal.Footer>
    </>
  )
}
