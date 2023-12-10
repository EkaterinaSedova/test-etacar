import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICryptos } from '../models/ICryptos'
export const cryptosAPI = createApi({
  reducerPath: 'cryptosAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coincap.io/v2/',
  }),
  endpoints: (build) => ({
    fetchAllCryptos: build.query<ICryptos, { limit: number; offset: number }>({
      query: ({ limit, offset }) => ({
        url: 'assets',
        params: {
          limit: limit,
          offset: offset,
        },
      }),
    }),
    fetchCryptos: build.query<ICryptos, string>({
      query: (search) => ({
        url: 'assets',
        params: {
          search: search,
        },
      }),
    }),
  }),
})

export const imagesAPI = createApi({
  reducerPath: 'imagesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://assets.coincap.io/assets/icons/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', 'Bearer bb0dd4f3-3fab-4be9-924e-150b9ce6db43')
      return headers
    },
  }),
  endpoints: (build) => ({
    fetchImage: build.query<string, string>({
      query: (symbol) => `${symbol}@2x.png`,
    }),
  }),
})

export const { useFetchAllCryptosQuery, useFetchCryptosQuery } = cryptosAPI
export const { useFetchImageQuery } = imagesAPI
