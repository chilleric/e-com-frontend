import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { generateToken, getListEditAble, lostOddProps } from '@/lib'
import { getListPermission, updatePermission } from '@/services/permission.service'
import {
  PermissionListResponse,
  PermissionRequest,
  PermissionRequestFailure,
  PermissionResponse,
} from '@/types/permission'
import { Button, Grid, Loading, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { PermissionRequestDefault, PermissionResponseDefault } from '../inventory'
import { ModifierPermission } from '../inventory/ModifierPermission'

export const PermissionDetail = () => {
  const [cookies] = useCookies()
  const router = useRouter()
  const translate = useTranslationFunction()

  const [type, setType] = useState<'read' | 'update'>('read')
  const [permissionState, setPermissionState] =
    useState<PermissionResponse>(PermissionResponseDefault)

  const viewResult = useApiCall<PermissionListResponse, string>({
    callApi: () =>
      getListPermission(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
        { _id: router?.query?.id?.toString() ?? '1' }
      ),
    handleSuccess: (message, data) => {
      setPermissionState(data.data[0])
    },
  })

  const updateResult = useApiCall<PermissionRequest, PermissionRequestFailure>({
    callApi: () =>
      updatePermission(
        router?.query?.id?.toString() ?? '1',
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        lostOddProps<PermissionRequest>(PermissionRequestDefault, permissionState)
      ),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
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

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const editLabel = useTranslation('edit')

  const permissionDetail = useTranslation('permissionDetail')

  const editPermission = useTranslation('editPermission')

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <Text h2 showIn="sm">
        {type === 'read' ? permissionDetail : editPermission}
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text h1 hideIn="sm">
          {type === 'read' ? permissionDetail : editPermission}
        </Text>
        <div>
          <Grid.Container css={{ gap: 20 }}>
            {type === 'read' ? (
              <>
                <Grid>
                  <Button
                    onClick={() => {
                      setType('update')
                    }}
                    size="sm"
                  >
                    {editLabel}
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    color="warning"
                    onClick={() => {
                      router.push('/permission/management')
                    }}
                    size="sm"
                  >
                    {cancelLabel}
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid>
                  <Button
                    color="success"
                    onClick={() => {
                      updateResult.setLetCall(true)
                    }}
                    size="sm"
                    disabled={updateResult.loading}
                  >
                    {updateResult.loading ? <Loading /> : <>{saveLabel}</>}
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    color="warning"
                    onClick={() => {
                      if (viewResult?.data?.result)
                        setPermissionState(viewResult.data.result.data[0])
                      updateResult.handleReset()
                      setType('read')
                    }}
                    size="sm"
                    disabled={updateResult.loading}
                  >
                    {cancelLabel}
                  </Button>
                </Grid>
              </>
            )}
          </Grid.Container>
        </div>
      </div>
      <ModifierPermission
        editAble={type === 'read' ? {} : getListEditAble(PermissionRequestDefault)}
        permissionState={permissionState}
        handleChangeState={handleChangeState}
        errorState={updateResult?.error?.result}
      />
    </div>
  )
}
