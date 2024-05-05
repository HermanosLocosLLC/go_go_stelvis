import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer/userReducer.js'
import appReducer from './appReducer/appReducer.js'

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
