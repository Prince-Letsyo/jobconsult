import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import { formDataToObject } from "@/utils";

const jobAdapter = createEntityAdapter();

const initialState = jobAdapter.getInitialState();

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobs/",
      providesTags: (result, error, arg) => [
        { type: "Job", id: "LIST" },
        ...result.data.map((id) => ({ type: "Job", id })),
      ],
    }),
    companyJobs: builder.query({
      query: () => "/jobs/company-jobs/",
      providesTags: (result, error, arg) => [
        { type: "Job", id: "LIST" },
        ...result.data.map((id) => ({ type: "Job", id })),
      ],
    }),
    getJobByJobId: builder.query({
      query: (id) => `/jobs/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.data.map((id) => ({ type: "Job", id })),
      ],
    }),
    addNewJob: builder.mutation({
      query: (initialUser) => ({
        url: `/jobs/`,
        method: "POST",
        body: initialUser,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      }),
      invalidatesTags: [{ type: "Job", id: "LIST" }],
    }),
    changeJobInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/jobs/${initialUser.id}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Job", id: arg.id }],
    }),
    mutateJobInfo: builder.mutation({
      query: (data) => ({
        url: `/jobs/${formDataToObject(data).id}/`,
        method: "PATCH",
        body: data,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Job", id: formDataToObject(arg).id },
      ],
    }),
    deleteJobInfo: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Job", id: arg.id }],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useCompanyJobsQuery,
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
} = jobAdapter.getSelectors((state) => selectJobsData(state) ?? initialState);
