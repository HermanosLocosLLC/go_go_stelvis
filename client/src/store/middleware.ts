import { Middleware } from '@reduxjs/toolkit'
import { RootState } from './store'

export const loggerMiddleware: Middleware<{}, RootState> =
  (_storeApi) => (next) => (action) => {
    console.log('📫 Dispatching action type: ', action)

    return next(action)
  }
