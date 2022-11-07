import { CustomTable } from '@/components'
import { useApiCall } from '@/hooks'
import { generateToken, getTotalPage } from '@/lib'
import {
  headerUserTable,
  listFunctionParseValue,
} from '@/modules/user/management/management.inventory'
import { getListUser } from '@/services'
import { UserListSuccess, UserResponseSuccess } from '@/types'
import { Pagination, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

interface IUserTablePermission {
  setListUser: Function
  listUser: string[]
  editAble?: boolean
}

export const UserTablePermission = ({ listUser, setListUser, editAble }: IUserTablePermission) => {
  const [cookies] = useCookies()

  const [userResponse, setUseResponse] = useState<UserListSuccess>()

  const [page, setPage] = useState<number>(1)

  const userResult = useApiCall<UserListSuccess, String>({
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
    handleSuccess(message, data) {
      setUseResponse(data)
    },
  })

  useEffect(() => {
    userResult.setLetCall(true)
  }, [page])

  return (
    <div>
      <Text h4>Select User</Text>
      <CustomTable<UserResponseSuccess>
        header={headerUserTable}
        body={userResponse?.data ?? []}
        selectionMode={editAble ? 'multiple' : 'none'}
        listFunctionParseValue={listFunctionParseValue}
        handleChangeSelection={setListUser}
        selectedKeys={listUser}
        loading={userResult.loading}
      >
        <>{null}</>
      </CustomTable>
      {!userResult.loading && (
        <Pagination
          shadow
          color="default"
          total={getTotalPage(userResult?.data?.result.totalRows || 0, 10)}
          onChange={(number) => setPage(number)}
        />
      )}
    </div>
  )
}
