import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer/userReducer'
import appReducer from './appReducer/appReducer'
import { loggerMiddleware } from './middleware'

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
