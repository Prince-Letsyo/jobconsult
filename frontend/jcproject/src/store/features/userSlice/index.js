import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users/",
      providesTags: (result, error, arg) =>  [
        { type: "User", id: "LIST" },
        ...result.data.map((id) => ({ type: "User", id })),
      ],
    }),
    getUserByUserId: builder.query({
      query: (id) => `/users/${id}/`,
      providesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    changeUserInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/${initialUser.id}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    mutateUserInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/${initialUser.id}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByUserIdQuery,
  useMutateUserInfoMutation,
  useChangeUserInfoMutation,
  useDeleteUserMutation,
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

export const selectUsersData = createSelector(
  selectUsersResult,
  (userResult) => userResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
