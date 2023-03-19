import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const jobSeekerAdapter = createEntityAdapter();

const initialState = jobSeekerAdapter.getInitialState();

export const jobSeekerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobSeekers: builder.query({
      query: () => "/users/job-seekers/",
      transformResponse: (responseData) => {
        return jobSeekerAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "JobSeeker", id: "LIST" },
        ...result.ids.map((id) => ({ type: "JobSeeker", id })),
      ],
    }),
    getJobSeekerByJobSeekerId: builder.query({
      query: (id) => `/users/job-seekers/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "JobSeeker", id })),
      ],
    }),
    addNewJobSeeker: builder.mutation({
      query: (initialUser) => `/users/job-seekers/`,
      method: "POST",
      body: {
        ...initialUser,
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    changeJobSeekerInfo: builder.mutation({
      query: (initialUser) => `/users/job-seekers/${initialUser.id}/`,
      method: "PUT",
      body: {
        ...initialUser,
      },
      invalidatesTags: (result, error, arg) => [
        { type: "JobSeeker", id: arg.id },
      ],
    }),
    mutateJobSeekerInfo: builder.mutation({
      query: (initialUser) => `/users/job-seekers/${initialUser.id}/`,
      method: "PATCH",
      body: {
        ...initialUser,
      },
      invalidatesTags: (result, error, arg) => [
        { type: "JobSeeker", id: arg.id },
      ],
    }),
    deleteJobSeekerInfo: builder.mutation({
      query: (id) => `/users/job-seekers/${id}/`,
      method: "DELETE",
      invalidatesTags: (result, error, arg) => [
        { type: "JobSeeker", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetJobSeekersQuery,
  useGetJobSeekerByJobSeekerIdQuery,
  useAddNewJobSeekerMutation,
  useMutateJobSeekerInfoMutation,
  useChangeJobSeekerInfoMutation,
  useDeleteJobSeekerInfoMutation,
} = jobSeekerApiSlice;

export const selectJobSeekersResult = jobSeekerApiSlice.endpoints.getJobSeekers.select();

export const selectJobSeekersData = createSelector(
  selectJobSeekersResult,
  (jobSeekersResult) => jobSeekersResult.data
);

export const {
  selectAll: selectAllJobSeekers,
  selectById: selectJobSeekerById,
  selectIds: selectJobSeekerIds,
} = jobSeekerAdapter.getSelectors(
  (state) => selectJobSeekersData(state) ?? initialState
);
