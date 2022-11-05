export interface UpdatePasswordRequest {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateGeneralRequest {
  darkTheme: boolean
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

export type UpdatePasswordFailure = Record<keyof UpdatePasswordRequest, string>

export type UpdateGeneralFailure = Record<keyof UpdateGeneralRequest, string>

export interface GeneralSettingsSuccessResponse {
  darkTheme: boolean
}
