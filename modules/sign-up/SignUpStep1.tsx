import { useTranslation, useTranslationFunction } from '@/hooks'
import { authenticationSelector, setSignUpRequest } from '@/redux/authentication'
import { CommonResponseType, SignUpFailure } from '@/types'
import { Input, Text } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { inputStyles } from './sign-up.inventory'

export const SignUpStep1 = ({ error }: { error?: CommonResponseType<SignUpFailure> }) => {
  const dispatch = useDispatch()
  const { signUpRequest } = useSelector(authenticationSelector)
  const translate = useTranslationFunction()

  const usernameLabel = useTranslation('username')
  const passwordLabel = useTranslation('password')
  const signInInformation = useTranslation('signInInformation')
  const stepLabel = useTranslation('step')

  return (
    <>
      <Text size={18}>
        {stepLabel} 1:
        <Text b css={{ marginLeft: 10 }}>
          {signInInformation}
        </Text>
      </Text>
      <Input
        value={signUpRequest.username}
        onChange={(e) =>
          dispatch(
            setSignUpRequest({
              username: e.target.value,
            })
          )
        }
        {...inputStyles({ error: error?.result?.username && translate(error.result.username) })}
        labelLeft={usernameLabel}
      />
      <Input
        value={signUpRequest.password}
        onChange={(e) =>
          dispatch(
            setSignUpRequest({
              password: e.target.value,
            })
          )
        }
        {...inputStyles({ error: error?.result?.password && translate(error.result.password) })}
        type="password"
        labelLeft={passwordLabel}
      />
    </>
  )
}
