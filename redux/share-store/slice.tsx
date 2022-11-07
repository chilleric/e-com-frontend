import { ShareStoreTypes } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ShareStoreTypes = {
  loading: false,
}

const ShareStoreSlice = createSlice({
  name: 'share_store',
  initialState,
  reducers: {
    setLoading: (state, actions: PayloadAction<boolean>) => {
      state.loading = actions.payload
    },
    resetShareStore: () => initialState,
  },
})

export const { resetShareStore, setLoading } = ShareStoreSlice.actions

export default ShareStoreSlice
