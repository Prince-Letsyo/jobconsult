import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const jobResponsibilityAdapter = createEntityAdapter();

const initialState = jobResponsibilityAdapter.getInitialState();

export const jobResponsibilityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteJobResponsibilityInfo: builder.mutation({
      query: (id) => ({
        url: `/jobs/responsibilities/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobResponsibility", id: arg.id },
      ],
    }),
  }),
});

export const {
  useDeleteJobResponsibilityInfoMutation,
} = jobResponsibilityApiSlice;
