import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { addNewUser } from '@/services'
import { UserDetailFailure, UserResponseSuccess } from '@/types'
import { Button, Container, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { DefaultUser, UserForm } from '../inventory'

export const UserCreate = () => {
  const [cookies, setCookie, removeCookie] = useCookies([DEVICE_ID, USER_ID])
  const router = useRouter()

  const [UserState, setUserState] = useState<UserResponseSuccess>(DefaultUser)

  const createResult = useApiCall<UserResponseSuccess, UserDetailFailure>({
    callApi: () =>
      addNewUser({
        user: UserState,
        token: generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
      }),
    handleError(status, message) {
      if (status !== 400) {
        toast.error(message)
      }
    },
    handleSuccess(message) {
      toast.success(message)
      router.push('/user/management')
    },
  })

  const onchangeUserState = (newUpdate: Partial<UserResponseSuccess>) => {
    const newUserState = Object.assign({}, UserState)
    setUserState({ ...newUserState, ...newUpdate })
  }

  return (
    <Container css={{ marginTop: 18, marginBottom: 80 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text h1>Create User</Text>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            color="success"
            onClick={() => {
              createResult.setLetCall(true)
            }}
          >
            Save
          </Button>
          <Button
            color="warning"
            onClick={() => {
              router.push('user/management')
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
      <UserForm
        type="create"
        user={UserState}
        onchangeUserState={onchangeUserState}
        errorState={createResult.error?.result}
      />
    </Container>
  )
}
