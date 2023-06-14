import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../api'

const choicesAdapter = createEntityAdapter()

const initialState = choicesAdapter.getInitialState()

export const choicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGenricChoice: builder.query({
      query: (choice) => `/choices/?choices=${choice}`,
      providesTags: (result, error, arg) => [
        { type: 'Choices', choice: arg.choice },
      ],
    }),
    getCities: builder.query({
      query: (cities) => `/choices/cities/?country_code=${cities}`,
      providesTags: (result, error, arg) => [
        { type: 'Cities', choice: arg.cities },
      ],
    }),
    getNationality: builder.query({
      query:()=> `/choices/nationalities/`,
      providesTags: (result, error, arg) => [
        { type: 'Nationality', key: 'LIST' },
        ...result.data.map((key) => ({ type: 'Nationality', key })),
      ],
    }),
    getCountries: builder.query({
      query: () => `/choices/countries/`,
      providesTags: (result, error, arg) => [
        { type: 'Countries', key: 'LIST' },
        ...result.data.map((key) => ({ type: 'Countries', key })),
      ],
    }),
  }),
})

export const {
  useGetGenricChoiceQuery,
  useGetNationalityQuery,
  useGetCitiesQuery,
  useGetCountriesQuery,
} = choicesApiSlice
