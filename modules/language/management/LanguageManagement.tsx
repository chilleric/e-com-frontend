import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { getLanguageList } from '@/services'
import { LanguageListResponseSuccess } from '@/types'
import { Button, Collapse, Loading, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { OneLanguage } from './OneLanguage'

export const LanguageManagement = () => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])

  const router = useRouter()

  const viewLanguageresult = useApiCall<LanguageListResponseSuccess, String>({
    callApi: () =>
      getLanguageList(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        })
      ),
    handleSuccess(message) {
      toast.success(message)
    },
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
  })

  useEffect(() => {
    viewLanguageresult.setLetCall(true)
  }, [])

  return (
    <>
      <Text showIn="sm" h2>
        Language Management
      </Text>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text hideIn="sm" h1>
          Language Management
        </Text>
        <Button
          onClick={() => {
            router.push('/language/create')
          }}
          size="sm"
        >
          Create New Language
        </Button>
      </div>

      {viewLanguageresult.loading ? (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <Loading size="md" />
        </div>
      ) : (
        <Collapse.Group>
          {viewLanguageresult.data?.result.data.map((language) => (
            <Collapse title={language.language}>
              <OneLanguage language={language} setLetCallList={viewLanguageresult.setLetCall} />
            </Collapse>
          ))}
        </Collapse.Group>
      )}
    </>
  )
}
