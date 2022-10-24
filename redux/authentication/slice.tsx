import { AuthenticationStoreTypes } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthenticationStoreTypes = {
  deviceId: '',
  userId: '',
};

const AuthenticationSlice = createSlice({
  name: 'authentication_store',
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
});

export default AuthenticationSlice;
