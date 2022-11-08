import { useApiCall } from '@/hooks'
import { useResponsive } from '@/hooks/useResponsive'
import { encodeBase64, generateToken } from '@/lib'
import { inputStylesUser } from '@/modules/user/inventory'
import { updatePassword } from '@/services/settings.service'
import { UpdatePasswordPayload } from '@/types'
import { Button, Input, Loading, Text } from '@nextui-org/react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

export const UpdatePassword = () => {
  const [cookies] = useCookies()
  const breakPoint = useResponsive()

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
      if (status) {
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Input
          css={{ width: breakPoint < 2 ? '100%' : '40%' }}
          {...inputStylesUser({ error: error?.result?.oldPassword })}
          type="password"
          label="Old password"
          onFocus={handleReset}
          value={oldPasswordState}
          onChange={(e) => {
            setOldPassword(e.currentTarget.value)
          }}
        />
        <Input
          css={{ width: breakPoint < 2 ? '100%' : '40%' }}
          {...inputStylesUser({ error: error?.result?.newPassword })}
          type="password"
          label="New password"
          onFocus={handleReset}
          value={newPasswordState}
          onChange={(e) => {
            setNewPassword(e.currentTarget.value)
          }}
        />
        <Input
          css={{ width: breakPoint < 2 ? '100%' : '40%' }}
          {...inputStylesUser({ error: error?.result?.confirmNewPassword })}
          type="password"
          label="Confirm new password"
          onFocus={handleReset}
          value={confirmPasswordState}
          onChange={(e) => {
            setConfirmPasswordState(e.currentTarget.value)
          }}
        />
      </div>

      <Button
        style={{ marginTop: 20 }}
        color="default"
        onClick={() => {
          setLetCall(true)
        }}
        size="md"
        disabled={updateResult.loading}
      >
        {updateResult.loading ? <Loading /> : <>Update Password</>}
      </Button>
    </div>
  )
}
