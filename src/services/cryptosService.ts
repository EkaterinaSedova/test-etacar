import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICryptos } from '../models/ICryptos'

export const cryptosAPI = createApi({
  reducerPath: 'cryptosAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coincap.io/v2/',
  }),
  endpoints: (build) => ({
    fetchAllCryptos: build.query<ICryptos, number>({
      query: (limit: number) => ({
        url: 'assets',
        params: {
          limit: limit,
        },
      }),
    }),
  }),
})

export const { useFetchAllCryptosQuery } = cryptosAPI
