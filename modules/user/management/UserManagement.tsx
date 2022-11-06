import { CustomTable } from '@/components/table'
import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken, getTotalPage } from '@/lib'
import { getListUser } from '@/services'
import { UserListSuccess, UserResponseSuccess } from '@/types'
import { Button, Container, Loading, Pagination, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { headerUserTable, listActions, listFunctionParseValue } from './management.inventory'

export const UserManagement = () => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])

  const [page, setPage] = useState<number>(1)

  const router = useRouter()

  const result = useApiCall<UserListSuccess, String>({
    callApi: () =>
      getListUser(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
        { page: page.toString() }
      ),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
  })

  const { data, loading, setLetCall } = result

  useEffect(() => {
    setLetCall(true)
  }, [page])

  return (
    <>
      {loading ? (
        <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
          <Loading />
        </Container>
      ) : (
        <>
          <Text showIn="xs" h2>
            User Management
          </Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text hideIn="xs" h1>
              User Management
            </Text>
            <Button
              onClick={() => {
                router.push('/user/create')
              }}
              size="sm"
            >
              Create User
            </Button>
          </div>
          <CustomTable<UserResponseSuccess>
            header={headerUserTable}
            body={data ? data.result.data : []}
            listActions={listActions}
            selectionMode="single"
            listFunctionParseValue={listFunctionParseValue}
          >
            <>{null}</>
          </CustomTable>
          <Pagination
            shadow
            color="default"
            total={getTotalPage(data?.result.totalRows || 0, 10)}
            onChange={(number) => setPage(number)}
          />
        </>
      )}
    </>
  )
}
