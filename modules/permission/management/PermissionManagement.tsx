import { CustomTable } from '@/components'
import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation } from '@/hooks'
import { generateToken, getTotalPage } from '@/lib'
import { getListPermission } from '@/services'
import { PermissionListResponse, PermissionResponse } from '@/types'
import { Button, Pagination, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { Header, ListActions, listFunctionParseValue } from './management.inventory'

export const PermissionManagement = () => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])

  const [page, setPage] = useState<number>(1)

  const router = useRouter()

  const permissionManagementPascal = useTranslation('permissionManagementPascal')

  const permissionCreatePascal = useTranslation('permissionCreatePascal')

  const result = useApiCall<PermissionListResponse, String>({
    callApi: () =>
      getListPermission(
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
  }, [])

  const listFunctionParseValues = listFunctionParseValue()

  const header = Header()

  const listActions = ListActions()

  return (
    <>
      <Text showIn="sm" h2>
        {permissionManagementPascal}
      </Text>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text hideIn="sm" h1>
          {permissionManagementPascal}
        </Text>
        <Button
          onClick={() => {
            router.push('/permission/create')
          }}
          size="sm"
        >
          {permissionCreatePascal}
        </Button>
      </div>
      <CustomTable<PermissionResponse>
        header={header}
        body={data ? data.result.data : []}
        listActions={listActions}
        selectionMode="single"
        listFunctionParseValue={listFunctionParseValues}
        loading={loading}
      >
        <>{null}</>
      </CustomTable>
      {!loading && (
        <Pagination
          shadow
          color="default"
          total={getTotalPage(data?.result.totalRows || 0, 10)}
          onChange={(number) => setPage(number)}
          page={page}
          css={{ marginTop: 20 }}
        />
      )}
    </>
  )
}
