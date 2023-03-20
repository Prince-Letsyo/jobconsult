import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const jobRequirementAdapter = createEntityAdapter();

const initialState = jobRequirementAdapter.getInitialState();

export const jobRequirementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobRequirements: builder.query({
      query: () => "/jobs/requirements/",
      providesTags: (result, error, arg) => [
        { type: "JobRequirement", id: "LIST" },
        ...result.data.map((id) => ({ type: "JobRequirement", id })),
      ],
    }),
    getJobRequirementByJobRequirementId: builder.query({
      query: (id) => `/jobs/requirements/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.data.map((id) => ({ type: "JobRequirement", id })),
      ],
    }),
    addNewJobRequirement: builder.mutation({
      query: (initialUser) => ({
        url: `/jobs/requirements/`,
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    changeJobRequirementInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/jobs/requirements/${initialUser.id}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobRequirement", id: arg.id },
      ],
    }),
    mutateJobRequirementInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/jobs/requirements/${initialUser.id}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobRequirement", id: arg.id },
      ],
    }),
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
  useGetJobRequirementsQuery,
  useGetJobRequirementByJobRequirementIdQuery,
  useAddNewJobRequirementMutation,
  useMutateJobRequirementInfoMutation,
  useChangeJobRequirementInfoMutation,
  useDeleteJobRequirementInfoMutation,
} = jobRequirementApiSlice;

export const selectJobRequirementsResult =
  jobRequirementApiSlice.endpoints.getJobRequirements.select();

export const selectJobRequirementsData = createSelector(
  selectJobRequirementsResult,
  (jobsResult) => jobsResult.data
);

export const {
  selectAll: selectAllJobRequirements,
  selectById: selectJobRequirementById,
  selectIds: selectJobRequirementIds,
} = jobRequirementAdapter.getSelectors(
  (state) => selectjobRequirementsData(state) ?? initialState
);
