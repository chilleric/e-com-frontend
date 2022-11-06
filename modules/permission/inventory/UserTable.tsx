import { CustomTable } from '@/components'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import {
  headerUserTable,
  listFunctionParseValue,
} from '@/modules/user/management/management.inventory'
import { getListUser } from '@/services'
import { UserListSuccess, UserResponseSuccess } from '@/types'
import { Text } from '@nextui-org/react'
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

  const userResult = useApiCall<UserListSuccess, String>({
    callApi: () =>
      getListUser(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        })
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
  }, [])

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
      >
        <>{null}</>
      </CustomTable>
    </div>
  )
}
