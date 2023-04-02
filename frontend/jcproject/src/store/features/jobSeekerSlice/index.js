import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const jobSeekerAdapter = createEntityAdapter();

const initialState = jobSeekerAdapter.getInitialState();

export const jobSeekerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobSeekers: builder.query({
      query: () => "/users/job-seekers/",
      providesTags: (result, error, arg) => [
        { type: "JobSeeker", user: "LIST" },
        ...result.data.map((user) => ({ type: "JobSeeker", user })),
      ],
    }),
    getJobSeekerByJobSeekerId: builder.query({
      query: (user) => `/users/job-seekers/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.data.map((user) => ({ type: "JobSeeker", user })),
      ],
    }),
    addNewJobSeeker: builder.mutation({
      query: (initialUser) => ({
        url: `/users/job-seekers/`,
        method: "POST",
        body: {
          ...initialUser,
        },
      }),

      invalidatesTags: [{ type: "JobSeeker", user: "LIST" }],
    }),
    changeJobSeekerInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/job-seekers/${initialUser.user}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobSeeker", user: arg.user },
      ],
    }),
    mutateJobSeekerInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/job-seekers/${initialUser.user}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobSeeker", user: arg.user },
      ],
    }),
    deleteJobSeekerInfo: builder.mutation({
      query: (user) => ({
        url: `/users/job-seekers/${user}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "JobSeeker", user: arg.user },
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

export const selectJobSeekersResult =
  jobSeekerApiSlice.endpoints.getJobSeekers.select();

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
