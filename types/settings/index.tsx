export type GeneralSettingsResponseSuccess = {
  darkTheme: boolean
}

export type UpdatePasswordPayload = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export interface UpdateAccountRequest {
  username: string
  gender: number
  dob: string
  address: string
  verify2FA: boolean
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type UpdateAccountFailure = Record<keyof UpdateAccountRequest, string>

export type UpdateGeneralFailure = Record<keyof GeneralSettingsResponseSuccess, string>
