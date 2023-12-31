import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cryptosAPI, imagesAPI } from '../services/cryptosService'
import modalSlice from './ModalSlice'

const rootReducer = combineReducers({
  [cryptosAPI.reducerPath]: cryptosAPI.reducer,
  [imagesAPI.reducerPath]: imagesAPI.reducer,
  modal: modalSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cryptosAPI.middleware, imagesAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
