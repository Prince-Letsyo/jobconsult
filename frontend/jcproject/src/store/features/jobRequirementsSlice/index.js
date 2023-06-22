import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const jobRequirementAdapter = createEntityAdapter();

const initialState = jobRequirementAdapter.getInitialState();

export const jobRequirementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    deleteJobRequirementInfo: builder.mutation({
      query: (id) => ({
        url: `/jobs/requirements/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobRequirement", id: arg.id },
      ],
    }),
  }),
});

export const {
  useDeleteJobRequirementInfoMutation,
} = jobRequirementApiSlice;

