import { useApiCall } from '@/hooks'
import { encodeBase64, generateToken } from '@/lib'
import { inputStylesUser } from '@/modules/user/inventory'
import { updatePassword } from '@/services/settings.service'
import { UpdatePasswordPayload } from '@/types'
import { Button, Container, Grid, Input, Text } from '@nextui-org/react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

export const UpdatePassword = () => {
  const [cookies] = useCookies()

  const [oldPasswordState, setOldPassword] = useState<string>('')
  const [newPasswordState, setNewPassword] = useState<string>('')
  const [confirmPasswordState, setConfirmPasswordState] = useState<string>('')

  const updateResult = useApiCall<string, UpdatePasswordPayload>({
    callApi: () =>
      updatePassword(generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }), {
        oldPassword: encodeBase64(oldPasswordState),
        newPassword: encodeBase64(newPasswordState),
        confirmNewPassword: encodeBase64(confirmPasswordState),
      }),
    handleError: (status, message) => {
      if (status !== 400) {
        toast.error(message)
      }
    },
    handleSuccess: (message) => {
      toast.success(message)
      setOldPassword('')
      setNewPassword('')
      setConfirmPasswordState('')
    },
  })

  const { error, handleReset, setLetCall } = updateResult

  return (
    <div>
      <Text h3>Change Password</Text>
      <hr style={{ margin: '10px 0' }} />

      <Grid.Container gap={4} justify="center">
        <Grid md={4}>
          <Input
            css={{ width: '100%' }}
            {...inputStylesUser({ error: error?.result?.oldPassword })}
            type="password"
            label="Old password"
            onFocus={handleReset}
            value={oldPasswordState}
            onChange={(e) => {
              setOldPassword(e.currentTarget.value)
            }}
          />
        </Grid>
        <Grid md={4}>
          <Input
            css={{ width: '100%' }}
            {...inputStylesUser({ error: error?.result?.newPassword })}
            type="password"
            label="New password"
            onFocus={handleReset}
            value={newPasswordState}
            onChange={(e) => {
              setNewPassword(e.currentTarget.value)
            }}
          />
        </Grid>
        <Grid md={4}>
          <Input
            css={{ width: '100%' }}
            {...inputStylesUser({ error: error?.result?.confirmNewPassword })}
            type="password"
            label="Confirm new password"
            onFocus={handleReset}
            value={confirmPasswordState}
            onChange={(e) => {
              setConfirmPasswordState(e.currentTarget.value)
            }}
          />
        </Grid>
      </Grid.Container>

      <Container>
        <Button
          style={{ marginTop: 20 }}
          color="default"
          onClick={() => {
            setLetCall(true)
          }}
          size="md"
        >
          Update Password
        </Button>
      </Container>
    </div>
  )
}
