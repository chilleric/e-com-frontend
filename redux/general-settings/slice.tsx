import { GeneralSettingsResponseSuccess } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: GeneralSettingsResponseSuccess = {
  darkTheme: false,
  languageKey: 'en',
}

const GeneralSettingsSlice = createSlice({
  name: 'generalSettings_store',
  initialState,
  reducers: {
    setGeneralSettings: (state, action: PayloadAction<Partial<GeneralSettingsResponseSuccess>>) => {
      Object.assign(state, { ...state, ...action.payload })
    },
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme
    },
    resetGeneralSettings: () => initialState,
  },
})

export const { resetGeneralSettings, toggleTheme, setGeneralSettings } =
  GeneralSettingsSlice.actions

export default GeneralSettingsSlice
