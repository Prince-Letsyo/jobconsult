import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const jobApplicationAdapter = createEntityAdapter();

const initialState = jobApplicationAdapter.getInitialState();

export const jobApplicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobApplications: builder.query({
      query: () => "/applications/job-applications/",
      providesTags: (result, error, arg) => [
        { type: "JobApplication", id: "LIST" },
        ...result.data.map((id) => ({ type: "JobApplication", id })),
      ],
    }),
    getJobApplicationByJobApplicationId: builder.query({
      query: (id) => `/applications/job-applications/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.data.map((id) => ({ type: "JobApplication", id })),
      ],
    }),
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
    changeJobApplicationInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/applications/job-applications/${initialUser.id}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobApplication", id: arg.id },
      ],
    }),
    mutateJobApplicationInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/applications/job-applications/${initialUser.id}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobApplication", id: arg.id },
      ],
    }),
    deleteJobApplicationInfo: builder.mutation({
      query: (id) => ({
        url: `/applications/job-applications/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobApplication", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetJobApplicationsQuery,
  useGetJobApplicationByJobApplicationIdQuery,
  useAddNewJobApplicationMutation,
  useMutateJobApplicationInfoMutation,
  useChangeJobApplicationInfoMutation,
  useDeleteJobApplicationInfoMutation,
} = jobApplicationApiSlice;

export const selectJobApplicationsResult =
  jobApplicationApiSlice.endpoints.getJobApplications.select();

export const selectJobApplicationsData = createSelector(
  selectJobApplicationsResult,
  (jobApplicationsResult) => jobApplicationsResult.data
);

export const {
  selectAll: selectAllJobApplications,
  selectById: selectJobApplicationById,
  selectIds: selectJobApplicationIds,
} = jobApplicationAdapter.getSelectors(
  (state) => selectJobApplicationsData(state) ?? initialState
);
