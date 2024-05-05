import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AlertPayload, AlertTypes, DarkModePayload } from './appTypes'

interface AppState {
  isLoading: boolean
  darkMode: boolean
  isAlert: boolean
  alertMessage: string
  alertType: AlertTypes | ''
}

const initialState: AppState = {
  isLoading: false,
  darkMode: false,
  isAlert: false,
  alertMessage: '',
  alertType: '',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startLoading: (state, _action: PayloadAction): AppState => {
      state.isLoading = true
      return state
    },
    stopLoading: (state, _action: PayloadAction): AppState => {
      state.isLoading = false
      return state
    },
    toggleDarkMode: (
      state,
      action: PayloadAction<DarkModePayload>,
    ): AppState => {
      state.darkMode = action.payload.darkMode || !state.darkMode
      return state
    },
    showAlert: (state, action: PayloadAction<AlertPayload>): AppState => {
      state.isAlert = true
      state.alertType = action.payload.alertType
      state.alertMessage = action.payload.alertMessage
      return state
    },
    clearAlert: (
      state,
      action: PayloadAction<{ timing?: number }>,
    ): AppState => {
      setTimeout(() => {
        state.isAlert = false
      }, action.payload.timing || 1500)
      return state
    },
  },
})

export const {
  startLoading,
  stopLoading,
  toggleDarkMode,
  showAlert,
  clearAlert,
} = appSlice.actions
export default appSlice.reducer
