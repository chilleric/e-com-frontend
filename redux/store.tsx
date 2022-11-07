import { AuthenticationStoreTypes, GeneralSettingsStoreTypes, ShareStoreTypes } from '@/types'
import { configureStore } from '@reduxjs/toolkit'
import AuthenticationSlice from './authentication/slice'
import GeneralSettingsSlice from './general-settings/slice'
import ShareStoreSlice from './share-store/slice'

const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice.reducer,
    generalSettings: GeneralSettingsSlice.reducer,
    shareStore: ShareStoreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store

export type RootState = {
  authentication: AuthenticationStoreTypes
  generalSettings: GeneralSettingsStoreTypes
  shareStore: ShareStoreTypes
}
