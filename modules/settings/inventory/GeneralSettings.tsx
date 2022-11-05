import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { getGeneralSettings, updateGeneralSettings } from '@/services/settings.service'
import { Container, Switch, Text } from '@nextui-org/react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { GeneralSettingsSelector, setGeneralSettings, toggleTheme } from '@/redux'
import { GeneralSettingsResponseSuccess, UpdateGeneralFailure } from '@/types'

export const GeneralSettings = () => {
  const [cookie] = useCookies()

  const GeneralSettings = useSelector(GeneralSettingsSelector)
  const dispatch = useDispatch()

  const viewResult = useApiCall<GeneralSettingsResponseSuccess, string>({
    callApi: () =>
      getGeneralSettings(generateToken({ userId: cookie.userId, deviceId: cookie.deviceId })),
    handleSuccess: (message, data) => {
      toast.success(message)
      dispatch(setGeneralSettings(data))
    },
    handleError: (status, message) => {
      if (status !== 400) {
        toast.error(message)
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
      toast.success(message)
    },
    handleError: (status, message) => {
      if (status !== 400) {
        toast.error(message)
      }
      if (status !== 401 && status !== 403) {
        viewResult.setLetCall(true)
      }
    },
  })

  return (
    <div>
      <Text h3>General Setting</Text>
      <hr style={{ margin: '10px 0' }} />

      <Container>
        <Text h5>Dark mode</Text>
        <Switch
          checked={GeneralSettings.darkTheme}
          onChange={() => {
            dispatch(toggleTheme())
            updateResult.setLetCall(true)
          }}
          iconOn={<MdLightMode />}
          iconOff={<MdDarkMode />}
        />
      </Container>
    </div>
  )
}
