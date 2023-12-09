import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cryptosAPI } from '../services/cryptosService'

const rootReducer = combineReducers({
  [cryptosAPI.reducerPath]: cryptosAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptosAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
