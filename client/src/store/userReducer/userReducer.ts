import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import { LoginPayload } from './userTypes'
import { authFetch } from '../../utils/authFetch'
import { AxiosError } from 'axios'
import { useAppDispatch } from '../../hooks/useRedux'
import {
  clearAlert,
  showAlert,
  startLoading,
  stopLoading,
} from '../appReducer/appReducer'

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
      return response.data
    } catch (err) {
      const errMsg = 'Something went wrong, please try again later'
      if (err instanceof AxiosError) {
        thunkApi.rejectWithValue(err.response?.data.message || errMsg)
      } else {
        return thunkApi.rejectWithValue(errMsg)
      }
    }
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // loginUser: (state, action: PayloadAction<LoginPayload>): UserState => {
    //   const { firstName, lastName, email, pfp } = action.payload
    //   state.firstName = firstName || ''
    //   state.lastName = lastName || ''
    //   state.email = email || ''
    //   state.pfp = pfp || null
    //   return state
    // },
    logoutUser: (state): UserState => {
      state = initialState
      return state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      // const dispatch = useAppDispatch()
      // dispatch(startLoading())
      return state
    })
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<LoginPayload>) => {
        console.log('Fulfilled', action.payload)
        // const dispatch = useAppDispatch()
        // dispatch(stopLoading())
        // const { firstName, lastName, email, pfp } = action.payload
        // state.firstName = firstName || ''
        // state.lastName = lastName || ''
        // state.email = email || ''
        // state.pfp = pfp || null
        return state
      },
    )
    builder.addCase(
      loginUser.rejected,
      (
        state,
        action: PayloadAction<
          unknown,
          string,
          {
            arg: { login: boolean; email: string; password: string }
            requestId: string
            requestStatus: 'rejected'
            aborted: boolean
            condition: boolean
          },
          SerializedError
        >,
      ) => {
        console.log('Rejected:', action.payload)
        // const dispatch = useAppDispatch()
        // dispatch(stopLoading())
        // dispatch(
        //   showAlert({
        //     alertMessage: action.payload as string,
        //     alertType: 'danger',
        //   }),
        // )
        // setTimeout(() => {
        //   dispatch(clearAlert())
        // }, 3000)
        return state
      },
    )
  },
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
