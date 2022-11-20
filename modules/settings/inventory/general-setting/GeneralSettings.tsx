import { useApiCall, useResponsive, useTranslation, useTranslationFunction } from '@/hooks'
import { generateToken } from '@/lib'
import { GeneralSettingsSelector, setGeneralSettings } from '@/redux/general-settings'
import { getGeneralSettings, updateGeneralSettings } from '@/services/settings.service'
import { GeneralSettingsResponseSuccess, UpdateGeneralFailure } from '@/types'
import { Container, Loading, Text } from '@nextui-org/react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SettingTheme } from './general-setting.inventory'
import { SettingLanguage } from './general-setting.inventory/SettingLanguage'

export const GeneralSettings = () => {
  const [cookie] = useCookies()
  const translate = useTranslationFunction()

  const GeneralSettings = useSelector(GeneralSettingsSelector)
  const dispatch = useDispatch()

  const responsive = useResponsive()

  const viewResult = useApiCall<GeneralSettingsResponseSuccess, string>({
    callApi: () =>
      getGeneralSettings(generateToken({ userId: cookie.userId, deviceId: cookie.deviceId })),
    handleSuccess: (message, data) => {
      toast.success(translate(message))
      dispatch(setGeneralSettings(data))
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const updateResult = useApiCall<GeneralSettingsResponseSuccess, UpdateGeneralFailure>({
    callApi: () =>
      updateGeneralSettings(
        generateToken({ userId: cookie.userId, deviceId: cookie.deviceId }),
        GeneralSettings
      ),
    handleSuccess: (message) => {
      toast.success(translate(message))
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(translate(message))
      }
      if (status !== 401 && status !== 403) {
        viewResult.setLetCall(true)
      }
    },
  })

  const generalSetting = useTranslation('generalSetting')

  return viewResult.loading ? (
    <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
      <Loading />
    </Container>
  ) : (
    <div>
      <Text h3>{generalSetting}</Text>
      <hr style={{ margin: '10px 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <SettingTheme
          darkTheme={GeneralSettings.darkTheme}
          setLetCallUpdate={updateResult.setLetCall}
          disabled={updateResult.loading || responsive < 3}
        />

        <SettingLanguage
          languageKey={GeneralSettings.languageKey}
          setLetCallUpdate={updateResult.setLetCall}
          disabled={updateResult.loading}
        />
      </div>
    </div>
  )
}
