import { CustomTable } from '@/components'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { generateToken, getTotalPage } from '@/lib'
import { getListFeature } from '@/services/feature.service'
import { FeatureListResponse, FeatureResponse } from '@/types'
import { Pagination } from '@nextui-org/react'
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
  })

  useEffect(() => {
    featureResult.setLetCall(true)
  }, [page])

  const headerFeatureTable = HeaderFeatureTable()

  const listFunctionParseValues = listFunctionParseValue()

  return (
    <div>
      <CustomTable<FeatureResponse>
        header={headerFeatureTable}
        body={featureResult?.data?.result?.data ?? []}
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
