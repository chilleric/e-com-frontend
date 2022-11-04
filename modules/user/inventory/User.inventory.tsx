import { UserResponseSuccess } from '@/types'
import { InputProps } from '@nextui-org/react'

export const DefaultUser: UserResponseSuccess = {
  id: '',
  username: '',
  password: '',
  gender: 0,
  dob: '',
  address: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  tokens: {},
  created: '',
  modified: '',
  verified: false,
  verify2FA: false,
  deleted: 0,
}

export const inputStylesUser = ({ error }: { error?: string }) => {
  const initialValue: Partial<InputProps> = {
    status: error ? 'error' : 'default',
    helperText: error ? error : '',
    underlined: true,
  }

  return {
    ...initialValue,
  }
}
