export interface UserResponseSuccess {
  id: string
  username: string
  password: string
  gender: number
  dob: string
  address: string
  firstName: string
  lastName: string
  email: string
  phone: string
  tokens: Tokens
  created: string
  modified: string
  verified: boolean
  verify2FA: boolean
  deleted: number
}

export interface UserListSuccess {
  data: UserResponseSuccess[]
  page: number
  pageSize: number
  totalRows: number
}

export interface Tokens {
  [key: string]: Date
}

export type UserDetailFailure = Record<keyof UserResponseSuccess, string>
