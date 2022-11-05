import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { getDetailUser } from '@/services'
import { updateAccountSettings } from '@/services/settings.service'
import { UpdateAccountFailure, UserResponseSuccess } from '@/types'
import { Button, Container, Loading, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { DefaultUser, UserForm } from '../user/inventory'

export const SettingsAccount = () => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])

  const [type, setType] = useState<'read' | 'update'>('read')
  const [UserState, setUserState] = useState<UserResponseSuccess>(DefaultUser)

  const viewResult = useApiCall<UserResponseSuccess, string>({
    callApi: () =>
      getDetailUser({
        id: cookies.userId,
        token: generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
      }),
  })

  const updateAccountResult = useApiCall<string, UpdateAccountFailure>({
    callApi: () =>
      updateAccountSettings(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
        UserState
      ),
    handleError(status, message) {
      if (status !== 400) {
        toast.error(message)
      }
    },
    handleSuccess(message) {
      toast.success(message)
    },
  })

  useEffect(() => {
    viewResult.setLetCall(true)
  }, [])

  const onchangeUserState = (newUpdate: Partial<UserResponseSuccess>) => {
    const newUserState = { ...UserState }
    setUserState({ ...newUserState, ...newUpdate })
  }

  useEffect(() => {
    if (viewResult.data) setUserState(viewResult.data.result)
  }, [viewResult.data])

  if (viewResult.loading)
    return (
      <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
        <Loading />
      </Container>
    )

  return (
    <>
      <Text h2 showIn="xs">
        {type === 'read' ? 'Account Detail' : 'Update Account'}
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text h1 hideIn="xs">
          {type === 'read' ? 'Account Detail' : 'Update Account'}
        </Text>
        <div style={{ display: 'flex', gap: 10 }}>
          {type === 'read' ? (
            <Button
              onClick={() => {
                setType('update')
              }}
              size="sm"
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                color={UserState.verify2FA ? 'success' : 'warning'}
                onClick={() => {
                  const newUserState = { ...UserState, verify2FA: !UserState.verify2FA }
                  setUserState(newUserState)
                }}
                size="sm"
              >
                {`Verify 2FA: ${UserState.verify2FA ? 'ON' : 'OFF'}`}
              </Button>
              <Button
                color="success"
                onClick={() => {
                  updateAccountResult.setLetCall(true)
                }}
                size="sm"
              >
                Save
              </Button>
              <Button
                color="warning"
                onClick={() => {
                  if (viewResult?.data?.result) setUserState(viewResult.data.result)
                  setType('read')
                }}
                size="sm"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
      <UserForm
        type={type}
        user={UserState}
        onchangeUserState={onchangeUserState}
        errorState={updateAccountResult?.error?.result}
      />
    </>
  )
}
