import { useTranslation } from '@/hooks'
import { toggleTheme } from '@/redux/general-settings'
import { Switch, Text } from '@nextui-org/react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useDispatch } from 'react-redux'

interface ISettingTheme {
  darkTheme: boolean
  setLetCallUpdate: Function
  disabled: boolean
}

export const SettingTheme = ({ darkTheme, setLetCallUpdate, disabled }: ISettingTheme) => {
  const dispatch = useDispatch()

  const darkMode = useTranslation('darkMode')

  return (
    <div>
      <Text h5>{darkMode}</Text>
      <Switch
        checked={darkTheme}
        onChange={() => {
          dispatch(toggleTheme())
          setLetCallUpdate(true)
        }}
        iconOn={<MdDarkMode />}
        iconOff={<MdLightMode />}
        disabled={disabled}
      />
    </div>
  )
}
