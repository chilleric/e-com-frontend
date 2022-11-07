import { authenticationSelector, setSignUpRequest } from '@/redux/authentication'
import { CommonResponseType, SignUpFailure } from '@/types'
import { Input, Text } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { inputStyles } from './sign-up.inventory'

export const SignUpStep1 = ({ error }: { error?: CommonResponseType<SignUpFailure> }) => {
  const dispatch = useDispatch()
  const { signUpRequest } = useSelector(authenticationSelector)

  return (
    <>
      <Text size={18}>
        Step 1:
        <Text b css={{ marginLeft: 10 }}>
          Sign in information
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
        {...inputStyles({ error: error?.result?.username })}
        labelLeft="Username"
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
        {...inputStyles({ error: error?.result?.password })}
        type="password"
        labelLeft="Password"
      />
    </>
  )
}
