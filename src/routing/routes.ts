import { CRYPTO_ROUTE, MAIN_ROUTE } from './paths'
import MainPage from '../components/Main/MainPage'
import SingleCrypto from '../components/Cryptos/SingleCrypto'

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: CRYPTO_ROUTE + '/:id',
    Component: SingleCrypto,
  },
]
