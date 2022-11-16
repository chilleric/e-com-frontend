import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation } from '@/hooks'
import { generateToken, getListEditAble, lostOddProps, StatusList } from '@/lib'
import { changeStatusUser, getDetailUser, updateUser } from '@/services'
import { UserRequest, UserRequestFailure, UserResponseSuccess } from '@/types'
import { Button, Container, Dropdown, Loading, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { DefaultUser, initUserRequest, UserForm } from '../inventory'

export const UserDetail = () => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])
  const router = useRouter()

  const [type, setType] = useState<'read' | 'update'>('read')
  const [UserState, setUserState] = useState<UserResponseSuccess>(DefaultUser)

  const viewResult = useApiCall<UserResponseSuccess, string>({
    callApi: () =>
      getDetailUser({
        id: router?.query?.id?.toString() ?? '1',
        token: generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
      }),
    handleSuccess: (message, data) => {
      setUserState(data)
    },
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
  })

  const updateResult = useApiCall<UserRequest, UserRequestFailure>({
    callApi: () =>
      updateUser({
        id: UserState.id,
        user: lostOddProps<UserRequest>(initUserRequest, UserState),
        token: generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
      }),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    handleSuccess(message) {
      toast.success(message)
      router.push('/user/management')
    },
  })

  const changeStatus = useApiCall<UserResponseSuccess, string>({
    callApi: () => {
      return changeStatusUser({
        id: router?.query?.id?.toString() ?? '1',
        token: generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
      })
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(message)
      }
    },
    handleSuccess: (message) => {
      toast.success(message)
      viewResult.setLetCall(true)
    },
  })

  useEffect(() => {
    if (router?.query?.id) {
      viewResult.setLetCall(true)
    }
  }, [router])

  const onchangeUserState = (newUpdate: Partial<UserResponseSuccess>) => {
    const newUserState = { ...UserState }
    setUserState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const editLabel = useTranslation('edit')

  const userDetail = useTranslation('userDetail')

  const userEdit = useTranslation('userEdit')

  const statusList = StatusList()

  if (viewResult.loading)
    return (
      <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
        <Loading />
      </Container>
    )

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <Text h2 showIn="sm">
        {type === 'read' ? userDetail : userEdit}
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
          {type === 'read' ? userDetail : userEdit}
        </Text>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Dropdown isDisabled={changeStatus.loading} isBordered>
            <Dropdown.Button
              size="sm"
              color={UserState.deleted === 0 ? 'success' : 'warning'}
              css={{ width: 144 }}
            >
              {statusList.find((item) => item.value === UserState.deleted)?.label}
            </Dropdown.Button>
            <Dropdown.Menu
              disallowEmptySelection
              selectedKeys={new Set([UserState.deleted.toString()])}
              selectionMode="single"
            >
              {statusList
                .filter((item) => item.value !== UserState.deleted)
                .map((item) => (
                  <Dropdown.Item key={item.value}>
                    <div
                      onClick={() => {
                        changeStatus.setLetCall(true)
                      }}
                    >
                      {item.label}
                    </div>
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <div style={{ display: 'flex', gap: 10 }}>
            {type === 'read' ? (
              <>
                <Button
                  onClick={() => {
                    setType('update')
                  }}
                  size="sm"
                >
                  {editLabel}
                </Button>
                <Button
                  color="warning"
                  onClick={() => {
                    router.push('/user/management')
                  }}
                  size="sm"
                >
                  {cancelLabel}
                </Button>
              </>
            ) : (
              <>
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
                <Button
                  color="warning"
                  onClick={() => {
                    if (viewResult?.data?.result) setUserState(viewResult.data.result)
                    setType('read')
                    updateResult.handleReset()
                  }}
                  size="sm"
                  disabled={updateResult.loading}
                >
                  {cancelLabel}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div style={{ paddingTop: 20 }}>
        <UserForm
          user={UserState}
          onchangeUserState={onchangeUserState}
          errorState={updateResult?.error?.result}
          editAble={type === 'update' ? getListEditAble(initUserRequest) : {}}
        />
      </div>
    </div>
  )
}
