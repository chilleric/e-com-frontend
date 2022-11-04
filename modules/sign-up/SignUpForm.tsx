import { useApiCall } from '@/hooks'
import { encodeBase64 } from '@/lib'
import { authenticationSelector } from '@/redux'
import { singUp } from '@/services'
import { SignUpFailure } from '@/types'
import { Button, Loading, Modal, Row, Text, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SignUpStepSwitch } from './SignStepSwitch'

export const SignUpForm = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()
  const [step, setStep] = useState<number>(1)

  const { signUpRequest } = useSelector(authenticationSelector)

  const router = useRouter()

  const handleChangeTheme = () => {
    if (isDark) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const { error, loading, setLetCall } = useApiCall<String, SignUpFailure>({
    callApi: () =>
      singUp({
        username: signUpRequest.username,
        password: encodeBase64(signUpRequest.password),
        firstName: signUpRequest.firstName,
        lastName: signUpRequest.lastName,
        phone: signUpRequest.phone,
        email: signUpRequest.email,
        address: signUpRequest.address,
      }),
    handleError(status, message) {
      toast.error(message)
    },
    handleSuccess(message) {
      toast.success(message)
      setStep(4)
    },
  })

  const handleLogin = () => {
    router.push('/login')
  }

  const handleSignUp = () => {
    if (step < 3) {
      setStep(step + 1)
    }
    if (step === 3) {
      setLetCall(true)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const showButton = () => {
    if (step === 1) {
      return (
        <>
          <Button auto onClick={handleLogin}>
            Sign in
          </Button>
          <Button disabled={loading} auto onClick={handleSignUp}>
            Next
          </Button>
        </>
      )
    }
    if (step === 3) {
      return (
        <>
          <Button disabled={loading} auto onClick={handleBack}>
            Back
          </Button>
          <Button disabled={loading} auto onClick={handleSignUp}>
            {loading ? <Loading /> : <>Sign up</>}
          </Button>
        </>
      )
    }

    return (
      <>
        <Button disabled={loading} auto onClick={handleBack}>
          Back
        </Button>
        <Button disabled={loading} auto onClick={handleSignUp}>
          Next
        </Button>
      </>
    )
  }

  return (
    <>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Sign up
        </Text>
      </Modal.Header>
      <Modal.Body>
        <SignUpStepSwitch setStep={setStep} step={step} error={error} />
        <Row />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat onClick={handleChangeTheme}>
          Change theme
        </Button>
        {showButton()}
      </Modal.Footer>
    </>
  )
}
