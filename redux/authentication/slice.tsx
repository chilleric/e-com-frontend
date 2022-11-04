import { AuthenticationStoreTypes, SignUpRequest } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthenticationStoreTypes = {
  deviceId: '',
  userId: '',
  signUpRequest: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 0,
    dob: '',
    phone: '',
    email: '',
    address: '',
  },
}

const AuthenticationSlice = createSlice({
  name: 'authentication_store',
  initialState,
  reducers: {
    setSignUpRequest: (state, actions: PayloadAction<Partial<SignUpRequest>>) => {
      const signUpRequest = {
        ...state.signUpRequest,
        ...actions.payload,
      }
      state.signUpRequest = signUpRequest
    },
    resetSignUpRequest: (state) => {
      state.signUpRequest = initialState.signUpRequest
    },
    reset: (state) => {
      state = initialState
    },
  },
})

const { setSignUpRequest, reset, resetSignUpRequest } = AuthenticationSlice.actions

export { setSignUpRequest, reset, resetSignUpRequest }

export default AuthenticationSlice
