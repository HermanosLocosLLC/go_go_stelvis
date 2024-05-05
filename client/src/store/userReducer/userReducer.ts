import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginPayload } from './userTypes'

interface UserState {
  firstName: string
  lastName: string
  email: string
  pfp: string | null
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  pfp: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginPayload>): UserState => {
      const { firstName, lastName, email, pfp } = action.payload
      state.firstName = firstName || ''
      state.lastName = lastName || ''
      state.email = email || ''
      state.pfp = pfp || null
      return state
    },
    logoutUser: (state): UserState => {
      state = initialState
      return state
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
