import { AuthenticationStoreTypes, SignUpRequest } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
};

const AuthenticationSlice = createSlice({
  name: 'authentication_store',
  initialState,
  reducers: {
    setSignUpRequest: (
      state,
      actions: PayloadAction<Partial<SignUpRequest>>,
    ) => {
      const signUpRequest = { ...state.signUpRequest, ...actions.payload };
      state.signUpRequest = signUpRequest;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

const { setSignUpRequest, reset } = AuthenticationSlice.actions;

export { setSignUpRequest, reset };

export default AuthenticationSlice;
