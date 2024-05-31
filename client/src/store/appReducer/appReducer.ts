import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  AlertPayload,
  AlertTypes,
  DarkModePayload,
  ToggleSideNavbarPayload,
} from './appTypes';
import { SerializedError } from '../../types/serializedError';

interface AppState {
  isLoading: boolean;
  darkMode: boolean;
  sideNavbarOpen: boolean | 'default';
  isAlert: boolean;
  alertMessage: string;
  alertType: AlertTypes | '';
  errors: SerializedError[];
}

const initialState: AppState = {
  isLoading: false,
  darkMode: false,
  sideNavbarOpen: 'default',
  isAlert: false,
  alertMessage: '',
  alertType: '',
  errors: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startLoading: (state): AppState => {
      state.isLoading = true;
      return state;
    },
    stopLoading: (state): AppState => {
      state.isLoading = false;
      return state;
    },
    toggleDarkMode: (
      state,
      action: PayloadAction<DarkModePayload>,
    ): AppState => {
      state.darkMode = action.payload.darkMode || !state.darkMode;
      return state;
    },
    showAlert: (state, action: PayloadAction<AlertPayload>): AppState => {
      state.isAlert = true;
      state.alertType = action.payload.alertType;
      state.alertMessage = action.payload.alertMessage;
      return state;
    },
    clearAlert: (state): AppState => {
      state.isAlert = false;
      return state;
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
            : !state.sideNavbarOpen;
      return state;
    },
    setErrors: (state, action: PayloadAction<SerializedError[]>) => {
      state.errors = action.payload;
      return state;
    },
    clearErrors: (state) => {
      state.errors = [];
      return state;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  toggleDarkMode,
  showAlert,
  clearAlert,
  toggleSideNavbar,
  setErrors,
  clearErrors,
} = appSlice.actions;
export default appSlice.reducer;
