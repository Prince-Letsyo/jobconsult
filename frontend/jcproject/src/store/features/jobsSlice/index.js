import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const jobAdapter = createEntityAdapter();

const initialState = jobAdapter.getInitialState();

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobs/",
      transformResponse: (responseData) => {
        return jobAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Job", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Job", id })),
      ],
    }),
    getJobByJobId: builder.query({
      query: (id) => `/jobs/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "Job", id })),
      ],
    }),
    addNewJob: builder.mutation({
      query: (initialUser) => `/jobs/`,
      method: "POST",
      body: {
        ...initialUser,
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    changeJobInfo: builder.mutation({
      query: (initialUser) => `/jobs/${initialUser.id}/`,
      method: "PUT",
      body: {
        ...initialUser,
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Job", id: arg.id },
      ],
    }),
    mutateJobInfo: builder.mutation({
      query: (initialUser) => `/jobs/${initialUser.id}/`,
      method: "PATCH",
      body: {
        ...initialUser,
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Job", id: arg.id },
      ],
    }),
    deleteJobInfo: builder.mutation({
      query: (id) => `/jobs/${id}/`,
      method: "DELETE",
      invalidatesTags: (result, error, arg) => [
        { type: "Job", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByJobIdQuery,
  useAddNewJobMutation,
  useMutateJobInfoMutation,
  useChangeJobInfoMutation,
  useDeleteJobInfoMutation,
} = jobApiSlice;

export const selectJobsResult = jobApiSlice.endpoints.getJobs.select();

export const selectJobsData = createSelector(
  selectJobsResult,
  (jobsResult) => jobsResult.data
);

export const {
  selectAll: selectAllJobs,
  selectById: selectJobById,
  selectIds: selectJobIds,
} = jobAdapter.getSelectors(
  (state) => selectJobsData(state) ?? initialState
);
