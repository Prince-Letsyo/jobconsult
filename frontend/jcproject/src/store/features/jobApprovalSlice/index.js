import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const jobApprovalAdapter = createEntityAdapter();

const initialState = jobApprovalAdapter.getInitialState();

export const jobApprovalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobApproval: builder.query({
      query: () => "/jobs/approved-jobs/",
      providesTags: (result, error, arg) => [
        { type: "JobApproval", id: "LIST" },
        ...result.data.map((id) => ({ type: "JobApproval", id })),
      ],
    }),

  }),
});

export const {
  useGetJobApprovalQuery,
} = jobApprovalApiSlice;

export const selectJobApprovalResult =
  jobApprovalApiSlice.endpoints.getJobApproval.select();

export const selectJobApprovalData = createSelector(
  selectJobApprovalResult,
  (JobApprovalResult) => JobApprovalResult.data
);

export const {
  selectAll: selectJobApproval,
  selectById: selectJobApprovalById,
  selectIds: selectJobApprovalIds,
} = jobApprovalAdapter.getSelectors(
  (state) => selectJobApprovalData(state) ?? initialState
);

