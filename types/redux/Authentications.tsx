import { SignUpRequest } from '../auth'

export type AuthenticationStoreTypes = {
  isForbidden: boolean
  signUpRequest: SignUpRequest
}
