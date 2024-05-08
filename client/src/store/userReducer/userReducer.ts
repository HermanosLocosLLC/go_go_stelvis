import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import { LoginPayload } from './userTypes'
import { authFetch } from '../../utils/authFetch'
import { AxiosError } from 'axios'
import { userFetch } from '../../utils/userFetch'

interface UserState {
  email: string
  firstName: string
  lastName: string
  pfp: string
  userType: 'gogo' | 'google' | 'facebook' | 'discord' | ''
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: UserState = {
  email: '',
  firstName: '',
  lastName: '',
  pfp: '',
  userType: '',
  loading: 'idle',
}

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, thunkApi) => {
    try {
      const response = await userFetch('/')
      return response.data
    } catch (err) {
      const errMsg = 'Something went wrong, please try again later'
      if (err instanceof AxiosError) {
        thunkApi.rejectWithValue(err.response?.data || [errMsg])
      } else {
        return thunkApi.rejectWithValue([errMsg])
      }
    }
  },
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    {
      login,
      email,
      password,
    }: { login: boolean; email: string; password: string },
    thunkApi,
  ) => {
    console.log('💥 Login User')

    if (!email || !password) return
    try {
      const response = await authFetch.post(
        `/gogo/${login ? 'login' : 'signup'}`,
        { email, password },
      )
      console.log('Response.data', response.data)
      return response.data
    } catch (err) {
      console.log('❌ Error:', err)
      const errMsg = 'Something went wrong, please try again later'
      if (err instanceof AxiosError) {
        console.log('AxiosError: thunkApi.rejectWithValue')
        console.log(err.response)
        return thunkApi.rejectWithValue(err.response?.data[0].message || errMsg)
      } else {
        console.log('Not AxiosError: thunkApi.rejectWithValue')
        return thunkApi.rejectWithValue(errMsg)
      }
    }
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state): UserState => {
      state = initialState
      return state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = 'pending'
      return state
    })
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<LoginPayload>) => {
        console.log('Fulfilled Action', action)
        console.log('Fulfilled', action.payload)
        state.loading = 'succeeded'
        state.email = action.payload.email
        state.firstName = action.payload.firstName || ''
        state.lastName = action.payload.lastName || ''
        state.pfp = action.payload.pfp || ''
        return state
      },
    )
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log('Rejected:', action.payload)
      state.loading = 'failed'
      return state
    })
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = 'pending'
      return state
    })
    builder.addCase(
      getCurrentUser.fulfilled,
      (state, action: PayloadAction<LoginPayload>) => {
        console.log('getCurrentUser Payload: ', action.payload)
        state.loading = 'succeeded'
        state.email = action.payload.email || ''
        state.firstName = action.payload.firstName || ''
        state.lastName = action.payload.lastName || ''
        state.pfp = action.payload.pfp || ''
        return state
      },
    )
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = 'idle'
      return state
    })
  },
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
