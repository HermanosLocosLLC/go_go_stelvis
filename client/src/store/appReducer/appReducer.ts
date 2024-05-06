import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  AlertPayload,
  AlertTypes,
  DarkModePayload,
  ToggleSideNavbarPayload,
} from './appTypes'

interface AppState {
  isLoading: boolean
  darkMode: boolean
  isAlert: boolean
  alertMessage: string
  alertType: AlertTypes | ''
  sideNavbarOpen: boolean | 'default'
}

const initialState: AppState = {
  isLoading: false,
  darkMode: false,
  isAlert: false,
  alertMessage: '',
  alertType: '',
  sideNavbarOpen: 'default',
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
    clearAlert: (state, _action: PayloadAction): AppState => {
      state.isAlert = false
      return state
    },
    toggleSideNavbar: (
      state,
      action: PayloadAction<ToggleSideNavbarPayload | undefined>,
    ): AppState => {
      state.sideNavbarOpen =
        action.payload?.type === 'close'
          ? false
          : action.payload?.type === 'open' ||
            state.sideNavbarOpen === 'default'
          ? true
          : !state.sideNavbarOpen
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
  toggleSideNavbar,
} = appSlice.actions
export default appSlice.reducer
