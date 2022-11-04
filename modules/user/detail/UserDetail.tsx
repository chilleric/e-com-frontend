import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken, statusList } from '@/lib'
import { changeStatusUser, getDetailUser, updateUser } from '@/services'
import { UserDetailFailure, UserResponseSuccess } from '@/types'
import { Button, Container, Dropdown, Loading, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { DefaultUser, UserForm } from '../inventory'

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
  })

  const updateResult = useApiCall<UserResponseSuccess, UserDetailFailure>({
    callApi: () =>
      updateUser({
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
      if (status !== 400) {
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

  useEffect(() => {
    if (viewResult.data) setUserState(viewResult.data.result)
  }, [viewResult.data])

  if (viewResult.loading)
    return (
      <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
        <Loading />
      </Container>
    )

  const onchangeUserState = (newUpdate: Partial<UserResponseSuccess>) => {
    const newUserState = { ...UserState }
    setUserState({ ...newUserState, ...newUpdate })
  }

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text h1>{type === 'read' ? 'User Detail' : 'Update Detail'}</Text>
        <div style={{ display: 'flex', gap: 10 }}>
          {type === 'read' ? (
            <>
              <Button
                onClick={() => {
                  setType('update')
                }}
              >
                Edit
              </Button>
              <Dropdown isBordered>
                <Dropdown.Button color={UserState.deleted === 0 ? 'success' : 'warning'}>
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
            </>
          ) : (
            <>
              <Button
                color="success"
                onClick={() => {
                  updateResult.setLetCall(true)
                }}
              >
                Save
              </Button>
              <Button
                color="warning"
                onClick={() => {
                  if (viewResult?.data?.result) setUserState(viewResult.data.result)
                  setType('read')
                }}
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
        errorState={updateResult?.error?.result}
      />
    </div>
  )
}
