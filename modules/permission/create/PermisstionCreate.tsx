import { useApiCall } from '@/hooks'
import { generateToken, getListEditAble } from '@/lib'
import { addPermission } from '@/services/permission.service'
import { PermissionRequest, PermissionRequestFailure } from '@/types'
import { Button, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { PermissionRequestDefault } from '../inventory'
import { ModifierPermission } from '../inventory/ModifierPermission'

export const PermissionCreate = () => {
  const [cookies] = useCookies()
  const router = useRouter()

  const [permissionState, setPermissionState] =
    useState<PermissionRequest>(PermissionRequestDefault)

  const createResult = useApiCall<PermissionRequest, PermissionRequestFailure>({
    callApi: () =>
      addPermission(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        permissionState
      ),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    handleSuccess(message) {
      toast.success(message)
      router.push('/permission/management')
    },
  })

  const handleChangeState = (NewUpdate: Partial<PermissionRequest>) => {
    const newState = { ...permissionState, ...NewUpdate }
    setPermissionState(newState)
  }

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <Text h2 showIn="xs">
        Create Permission
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text h1 hideIn="xs">
          Create Permission
        </Text>
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <Button
            color="success"
            onClick={() => {
              createResult.setLetCall(true)
            }}
            size="sm"
          >
            Save
          </Button>
          <Button
            color="warning"
            onClick={() => {
              router.push('/permission/management')
            }}
            size="sm"
          >
            Cancel
          </Button>
        </div>
      </div>
      <ModifierPermission
        editAble={getListEditAble(PermissionRequestDefault)}
        permissionState={permissionState}
        handleChangeState={handleChangeState}
        errorState={createResult?.error?.result}
      />
    </div>
  )
}
