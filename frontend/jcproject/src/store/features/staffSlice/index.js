import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const staffAdapter = createEntityAdapter();

const initialState = staffAdapter.getInitialState();

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStaffs: builder.query({
      query: () =>  "/users/staff-users/",
      providesTags: (result, error, arg) => [
        { type: "Staff", id: "LIST" },
        ...result.data.map((id) => ({ type: "Staff", id })),
      ],
    }),
    getStaffByStaffId: builder.query({
      query: (id) => 
        `/users/staff-users/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.data.map((id) => ({ type: "Staff", id })),
      ],
    }),
    addNewStaff: builder.mutation({
      query: (initialUser) => ({
        url: `/users/staff-users/`,
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: [{ type: "Staff", id: "LIST" }],
    }),
    changeStaffInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/staff-users/${initialUser.id}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Staff", id: arg.id }],
    }),
    mutateStaffInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/staff-users/${initialUser.id}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Staff", id: arg.id }],
    }),
    deleteStaffInfo: builder.mutation({
      query: (id) => ({
        url: `/users/staff-users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Staff", id: arg.id }],
    }),
  }),
});

export const {
  useGetStaffsQuery,
  useGetStaffByStaffIdQuery,
  useAddNewStaffMutation,
  useMutateStaffInfoMutation,
  useChangeStaffInfoMutation,
  useDeleteStaffInfoMutation,
} = staffApiSlice;

export const selectStaffsResult = staffApiSlice.endpoints.getStaffs.select();

export const selectStaffsData = createSelector(
  selectStaffsResult,
  (staffsResult) => staffsResult.data
);

export const {
  selectAll: selectAllStaffs,
  selectById: selectStaffById,
  selectIds: selectStaffIds,
} = staffAdapter.getSelectors(
  (state) => selectStaffsData(state) ?? initialState
);
