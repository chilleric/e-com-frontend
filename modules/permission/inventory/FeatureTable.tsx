import { CustomTable } from '@/components'
import { useApiCall } from '@/hooks'
import { generateToken, getTotalPage } from '@/lib'
import { getListFeature } from '@/services/feature.service'
import { FeatureListResponse, FeatureResponse } from '@/types'
import { Pagination, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { headerFeatureTable } from './permission.inventory'

interface IUserTablePermission {
  setListFeature: Function
  listFeature: string[]
  editAble?: boolean
}

export const FeatureTablePermission = ({
  listFeature,
  setListFeature,
  editAble,
}: IUserTablePermission) => {
  const [cookies] = useCookies()

  const [page, setPage] = useState<number>(1)

  const [featureResponse, setFeatureResponse] = useState<FeatureListResponse>()
  const featureResult = useApiCall<FeatureListResponse, String>({
    callApi: () =>
      getListFeature(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
        {
          page: page.toString(),
        }
      ),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    handleSuccess(message, data) {
      setFeatureResponse(data)
    },
  })

  useEffect(() => {
    featureResult.setLetCall(true)
  }, [page])

  return (
    <div>
      <Text h4>Select feature</Text>
      <CustomTable<FeatureResponse>
        header={headerFeatureTable}
        body={featureResponse?.data ?? []}
        selectionMode={editAble ? 'multiple' : 'none'}
        listFunctionParseValue={{}}
        handleChangeSelection={setListFeature}
        selectedKeys={listFeature}
        loading={featureResult.loading}
      >
        <>{null}</>
      </CustomTable>
      {!featureResult.loading && (
        <Pagination
          shadow
          color="default"
          total={getTotalPage(featureResult?.data?.result.totalRows || 0, 10)}
          onChange={(number) => setPage(number)}
        />
      )}
    </div>
  )
}
