import { ShareStoreTypes } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ShareStoreTypes = {
  settingsLoading: false,
  languageLoading: false,
  language: {},
}

const ShareStoreSlice = createSlice({
  name: 'share_store',
  initialState,
  reducers: {
    setLoadingSettings: (state, actions: PayloadAction<boolean>) => {
      state.settingsLoading = actions.payload
    },
    setLoadingLanguage: (state, actions: PayloadAction<boolean>) => {
      state.languageLoading = actions.payload
    },
    setLanguage: (state, actions: PayloadAction<{ [key: string]: string }>) => {
      state.language = actions.payload
    },
    resetShareStore: () => initialState,
  },
})

export const { resetShareStore, setLoadingSettings, setLoadingLanguage, setLanguage } =
  ShareStoreSlice.actions

export default ShareStoreSlice
