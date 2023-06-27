import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../api'

const applicationDocAdapter = createEntityAdapter()

const initialState = applicationDocAdapter.getInitialState()

export const applicationDocApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewApplicationDoc: builder.mutation({
      query: (initialUser) => ({
        url: `/applications/applicant-docs/`,
        method: 'POST',
        body: initialUser,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      }),
      invalidatesTags: [{ type: 'ApplicationDoc', id: 'LIST' }],
    }),
  }),
})

export const { useAddNewApplicationDocMutation } = applicationDocApiSlice
