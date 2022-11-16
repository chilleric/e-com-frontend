import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation } from '@/hooks'
import { generateToken } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { setLanguage } from '@/redux/share-store'
import { getLanguageByKey, getLanguageList } from '@/services'
import { LanguageListResponseSuccess, LanguageResponseSuccess } from '@/types'
import { Collapse, Loading, Text } from '@nextui-org/react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { DictionaryCreatePopup } from '../inventory/DictionaryCreatePopup'
import { LanguageCreatePopup } from '../inventory/LanguageCreatePopup'
import { OneLanguage } from './OneLanguage'

export const LanguageManagement = () => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])

  const viewLanguageresult = useApiCall<LanguageListResponseSuccess, String>({
    callApi: () =>
      getLanguageList(
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
  })

  const dispatch = useDispatch()

  const { languageKey } = useSelector(GeneralSettingsSelector)

  const getLanguage = useApiCall<LanguageResponseSuccess, string>({
    callApi: () =>
      getLanguageByKey(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        languageKey
      ),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    handleSuccess(message, data) {
      dispatch(setLanguage(data.dictionary))
    },
  })

  const updateStoreLanguage = () => {
    getLanguage.setLetCall(true)
  }

  useEffect(() => {
    viewLanguageresult.setLetCall(true)
  }, [])

  return (
    <>
      <Text showIn="sm" h2>
        {useTranslation('langMangPascal')}
      </Text>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text hideIn="sm" h1>
          {useTranslation('langMangPascal')}
        </Text>
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <DictionaryCreatePopup
            updateStoreLanguage={updateStoreLanguage}
            setLetCallList={viewLanguageresult.setLetCall}
            listKeyOfDictionary={[
              'key',
              ...(viewLanguageresult.data?.result.data.map((language) => language.key) ?? []),
            ]}
          />
          <LanguageCreatePopup
            updateStoreLanguage={updateStoreLanguage}
            setLetCallList={viewLanguageresult.setLetCall}
          />
        </div>
      </div>

      {viewLanguageresult.loading ? (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <Loading size="md" />
        </div>
      ) : (
        <Collapse.Group>
          {viewLanguageresult.data?.result.data.map((language) => (
            <Collapse title={language.language}>
              <OneLanguage
                updateStoreLanguage={updateStoreLanguage}
                language={language}
                setLetCallList={viewLanguageresult.setLetCall}
              />
            </Collapse>
          ))}
        </Collapse.Group>
      )}
    </>
  )
}
