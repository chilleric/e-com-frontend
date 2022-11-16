import { ShareStoreTypes } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ShareStoreTypes = {
  loading: false,
  language: {},
}

const ShareStoreSlice = createSlice({
  name: 'share_store',
  initialState,
  reducers: {
    setLoading: (state, actions: PayloadAction<boolean>) => {
      state.loading = actions.payload
    },
    setLanguage: (state, actions: PayloadAction<{ [key: string]: string }>) => {
      state.language = actions.payload
    },
    resetShareStore: () => initialState,
  },
})

export const { resetShareStore, setLoading, setLanguage } = ShareStoreSlice.actions

export default ShareStoreSlice
