import { CustomTable } from '@/components'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { generateToken, getTotalPage } from '@/lib'
import { getListFeature } from '@/services/feature.service'
import { FeatureListResponse, FeatureResponse } from '@/types'
import { Pagination, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { HeaderFeatureTable, listFunctionParseValue } from './permission.inventory'

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
  const translate = useTranslationFunction()

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
        toast.error(translate(message))
      }
    },
    handleSuccess(message, data) {
      setFeatureResponse(data)
    },
  })

  useEffect(() => {
    featureResult.setLetCall(true)
  }, [page])

  const selectFeature = useTranslation('selectFeature')

  const headerFeatureTable = HeaderFeatureTable()

  const listFunctionParseValues = listFunctionParseValue()

  return (
    <div>
      <Text h4>{selectFeature}</Text>
      <CustomTable<FeatureResponse>
        header={headerFeatureTable}
        body={featureResponse?.data ?? []}
        selectionMode={editAble ? 'multiple' : 'none'}
        listFunctionParseValue={listFunctionParseValues}
        handleChangeSelection={setListFeature}
        selectedKeys={listFeature}
        loading={featureResult.loading}
      >
        <>{null}</>
      </CustomTable>
      {!featureResult.loading && (
        <Pagination
          shadow
          total={getTotalPage(featureResult?.data?.result.totalRows || 0, 10)}
          onChange={(number) => setPage(number)}
          page={page}
          css={{ marginTop: 20 }}
        />
      )}
    </div>
  )
}
