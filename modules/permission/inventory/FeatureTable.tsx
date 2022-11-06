import { CustomTable } from '@/components'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { getListFeature } from '@/services/feature.service'
import { FeatureListResponse, FeatureResponse } from '@/types'
import { Text } from '@nextui-org/react'
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

  const [featureResponse, setFeatureesponse] = useState<FeatureListResponse>()
  const featureResult = useApiCall<FeatureListResponse, String>({
    callApi: () =>
      getListFeature(
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
      setFeatureesponse(data)
    },
  })

  useEffect(() => {
    featureResult.setLetCall(true)
  }, [])

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
      >
        <>{null}</>
      </CustomTable>
    </div>
  )
}
