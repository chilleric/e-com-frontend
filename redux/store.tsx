import { AuthenticationStoreTypes, GeneralSettingsResponseSuccess } from '@/types'
import { configureStore } from '@reduxjs/toolkit'
import AuthenticationSlice from './authentication/slice'
import GeneralSettingsSlice from './general-settings/slice'

const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice.reducer,
    generalSettings: GeneralSettingsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store

export type RootState = {
  authentication: AuthenticationStoreTypes
  generalSettings: GeneralSettingsResponseSuccess
}
