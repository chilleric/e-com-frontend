import { useApiCall } from '@/hooks'
import { generateToken, getListEditAble, lostOddProps } from '@/lib'
import { getListPermission, updatePermission } from '@/services/permission.service'
import {
  PermissionListSuccess,
  PermissionRequest,
  PermissionRequestFailure,
  PermissionResponseSuccess,
} from '@/types/permission'
import { Button, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { PermissionRequestDefault, PermissionResponseDefault } from '../inventory'
import { ModifierPermission } from '../inventory/ModifierPermission'

export const PermissionDetail = () => {
  const [cookies] = useCookies()
  const router = useRouter()

  const [type, setType] = useState<'read' | 'update'>('read')
  const [permissionState, setPermissionState] =
    useState<PermissionResponseSuccess>(PermissionResponseDefault)

  const viewResult = useApiCall<PermissionListSuccess, string>({
    callApi: () =>
      getListPermission(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
        { _id: router?.query?.id?.toString() ?? '1' }
      ),
    handleSuccess: (message, data) => {
      toast.success(message)
      setPermissionState(data.data[0])
    },
  })

  const UpdateResult = useApiCall<PermissionRequest, PermissionRequestFailure>({
    callApi: () =>
      updatePermission(
        router?.query?.id?.toString() ?? '1',
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        lostOddProps<PermissionRequest>(PermissionRequestDefault, permissionState)
      ),
    handleError(status, message) {
      if (status !== 400) {
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

  useEffect(() => {
    if (router?.query?.id) {
      viewResult.setLetCall(true)
    }
  }, [router?.query?.id])

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <Text h2 showIn="xs">
        {type === 'read' ? 'Permission Detail' : 'Update Detail'}
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text h1 hideIn="xs">
          {type === 'read' ? 'Permission Detail' : 'Update Detail'}
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
                color="success"
                onClick={() => {
                  UpdateResult.setLetCall(true)
                }}
                size="sm"
              >
                Save
              </Button>
              <Button
                color="warning"
                onClick={() => {
                  if (viewResult?.data?.result) setPermissionState(viewResult.data.result.data[0])
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
      <ModifierPermission
        editAble={type === 'read' ? {} : getListEditAble(PermissionRequestDefault)}
        permissionState={permissionState}
        handleChangeState={handleChangeState}
        errorState={UpdateResult?.error?.result}
      />
    </div>
  )
}
