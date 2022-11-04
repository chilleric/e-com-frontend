import { CommonResponseType, SignUpFailure } from '@/types'
import { useEffect } from 'react'
import { SignUpStep1 } from './SignUpStep1'
import { SignUpStep2 } from './SignUpStep2'
import { SignUpStep3 } from './SignUpStep3'
import { SignUpVerify } from './SignUpVerify'

export const SignUpStepSwitch = ({
  step,
  error,
  setStep,
}: {
  step: number
  error?: CommonResponseType<SignUpFailure>
  setStep: (step: number) => void
}) => {
  const listStep = [
    {
      step: 1,
      component: <SignUpStep1 error={error} />,
    },
    {
      step: 2,
      component: <SignUpStep2 error={error} />,
    },
    {
      step: 3,
      component: <SignUpStep3 error={error} />,
    },
    {
      step: 4,
      component: <SignUpVerify />,
    },
  ]

  useEffect(() => {
    if (error?.result.username || error?.result.password) {
      setStep(1)
      return
    }
    if (
      error?.result.firstName ||
      error?.result.lastName ||
      error?.result.gender ||
      error?.result.dob
    ) {
      setStep(2)
      return
    }
    if (error?.result.phone || error?.result.email || error?.result.address) {
      setStep(3)
      return
    }
  }, [error?.result])

  return listStep.find((item) => item.step === step)?.component || null
}
