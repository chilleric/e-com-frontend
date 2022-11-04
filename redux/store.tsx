import { AuthenticationStoreTypes } from '@/types'
import { configureStore } from '@reduxjs/toolkit'
import AuthenticationSlice from './authentication/slice'

const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store

export type RootState = {
  authentication: AuthenticationStoreTypes
}
