import { useApiCall, useGetDarkMode, useResponsive } from '@/hooks'
import { generateToken } from '@/lib'
import { GeneralSettingsSelector, setGeneralSettings } from '@/redux/general-settings'
import { setLoading } from '@/redux/share-store'
import { getGeneralSettings } from '@/services/settings.service'
import { DarkTheme, LightTheme } from '@/styles/themes'
import { GeneralSettingsResponseSuccess } from '@/types'
import { NextUIProvider } from '@nextui-org/react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { BackDropModal } from '../modals'

export const NextUiProviderTheme = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies()

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const responsive = useResponsive()

  const dispatch = useDispatch()

  const result = useApiCall<GeneralSettingsResponseSuccess, string>({
    callApi: () =>
      getGeneralSettings(generateToken({ userId: cookies.userId, deviceId: cookies.deviceId })),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    handleSuccess(message, data) {
      if (responsive === 3) {
        dispatch(setGeneralSettings(data))
      }
    },
  })

  const isDark = useGetDarkMode()

  useEffect(() => {
    if (responsive < 3 && darkTheme !== isDark) {
      dispatch(setGeneralSettings({ darkTheme: isDark }))
    }
  }, [isDark])

  useEffect(() => {
    if (cookies.deviceId && cookies.userId) {
      result.setLetCall(true)
    }
  }, [cookies.deviceId, cookies.userId])

  useEffect(() => {
    dispatch(setLoading(result.loading))
  }, [result.loading])

  return (
    <NextUIProvider theme={darkTheme ? DarkTheme : LightTheme}>
      {children} <BackDropModal />
    </NextUIProvider>
  )
}
