import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const jobApplicationAdapter = createEntityAdapter();

const initialState = jobApplicationAdapter.getInitialState();

export const jobApplicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    addNewJobApplication: builder.mutation({
      query: (initialUser) => ({
        url: `/applications/job-applications/`,
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: [{ type: "JobApplication", id: "LIST" }],
    }),
   
  }),
});

export const {

  useAddNewJobApplicationMutation,
} = jobApplicationApiSlice;

