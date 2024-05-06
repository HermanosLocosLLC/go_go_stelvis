export interface DarkModePayload {
  darkMode?: boolean
}

export type AlertTypes = 'success' | 'danger' | 'plain' | ''

export interface AlertPayload {
  alertType: AlertTypes
  alertMessage: string
}

export interface ToggleSideNavbarPayload {
  type?: 'open' | 'close'
}
