import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const jobResponsibilityAdapter = createEntityAdapter();

const initialState = jobResponsibilityAdapter.getInitialState();

export const jobResponsibilityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobResponsibilities: builder.query({
      query: () => "/jobs/responsibilities/",
      providesTags: (result, error, arg) => [
        { type: "JobResponsibility", id: "LIST" },
        ...result.data.map((id) => ({ type: "JobResponsibility", id })),
      ],
    }),
    getJobResponsibilityByJobResponsibilityId: builder.query({
      query: (id) => `/jobs/responsibilities/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.data.map((id) => ({ type: "JobResponsibility", id })),
      ],
    }),
    addNewJobResponsibility: builder.mutation({
      query: (initialUser) => ({
        url: `/jobs/responsibilities/`,
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: [{ type: "JobResponsibility", id: "LIST" }],
    }),
    changeJobResponsibilityInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/jobs/responsibilities/${initialUser.id}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobResponsibility", id: arg.id },
      ],
    }),
    mutateJobResponsibilityInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/jobs/responsibilities/${initialUser.id}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobResponsibility", id: arg.id },
      ],
    }),
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
  useGetJobResponsibilitiesQuery,
  useGetJobResponsibilityByJobResponsibilityIdQuery,
  useAddNewJobResponsibilityMutation,
  useMutateJobResponsibilityInfoMutation,
  useChangeJobResponsibilityInfoMutation,
  useDeleteJobResponsibilityInfoMutation,
} = jobResponsibilityApiSlice;

export const selectJobResponsibilitiesResult =
  jobResponsibilityApiSlice.endpoints.getJobResponsibilities.select();

export const selectjobResponsibilitysData = createSelector(
  selectJobResponsibilitiesResult,
  (jobResponsibilitiesResult) => jobResponsibilitiesResult.data
);

export const {
  selectAll: selectAllJobResponsibilities,
  selectById: selectJobResponsibilityById,
  selectIds: selectJobResponsibilityIds,
} = jobResponsibilityAdapter.getSelectors(
  (state) => selectjobResponsibilitysData(state) ?? initialState
);
