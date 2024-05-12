import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer/userReducer.js'
import appReducer from './appReducer/appReducer.js'
import { loggerMiddleware } from './middleware.js'

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
})

const store = configureStore({
  reducer: rootReducer,
  // middleware: () => new Tuple(loggerMiddleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export default store
