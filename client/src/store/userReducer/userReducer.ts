import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
    if (!email || !password) return
    try {
      const response = await authFetch.post(
        `/gogo/${login ? 'login' : 'signup'}`,
        { email, password },
      )
      return response.data
    } catch (err) {
      console.log('❌ Error:', err)
      const errMsg = 'Something went wrong, please try again later'
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          err.response?.data || [{ message: errMsg }],
        )
      } else {
        return thunkApi.rejectWithValue([{ message: errMsg }])
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
        state.loading = 'succeeded'
        state.email = action.payload.email
        state.firstName = action.payload.firstName || ''
        state.lastName = action.payload.lastName || ''
        state.pfp = action.payload.pfp || ''
        return state
      },
    )
    builder.addCase(loginUser.rejected, (state) => {
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
        state.loading = 'succeeded'
        if (!action.payload.email) return state

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
