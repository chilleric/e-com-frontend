import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { GeneralSettingsSelector, setGeneralSettings } from '@/redux'
import { getGeneralSettings } from '@/services/settings.service'
import { DarkTheme, LightTheme } from '@/styles/themes'
import { GeneralSettingsResponseSuccess } from '@/types'
import { NextUIProvider } from '@nextui-org/react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'

export const NextUiProviderTheme = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies()

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const dispatch = useDispatch()

  const result = useApiCall<GeneralSettingsResponseSuccess, string>({
    callApi: () =>
      getGeneralSettings(generateToken({ userId: cookies.userId, deviceId: cookies.deviceId })),
  })

  useEffect(() => {
    if (cookies.deviceId && cookies.userId) {
      result.setLetCall(true)
    }
  }, [cookies.deviceId, cookies.userId])

  useEffect(() => {
    if (result.data) {
      dispatch(setGeneralSettings(result.data.result))
    }
  }, [result.data])

  return <NextUIProvider theme={darkTheme ? DarkTheme : LightTheme}>{children}</NextUIProvider>
}
