import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const companyRepAdapter = createEntityAdapter();

const initialState = companyRepAdapter.getInitialState();

export const companyRepApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyReps: builder.query({
      query: () => "/users/company-reps/",
      providesTags: (result, error, arg) => [
        { type: "CompanyRep", user: "LIST" },
        ...result.data.map((user) => ({ type: "CompanyRep", user })),
      ],
    }),
    getCompanyRepByCompanyRepId: builder.query({
      query: (user) => `/users/company-reps/${user}/`,
      providesTags: (result, error, arg) => [{ type: "CompanyRep", user: arg.user }],
    }),
    addNewCompanyRep: builder.mutation({
      query: (initialUser) => ({
        url: `/users/company-reps/`,
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: [{ type: "CompanyRep", user: "LIST" }],
    }),
    changeCompanyRepInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/company-reps/${initialUser.user}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyRep", user: arg.user },
      ],
    }),
    mutateCompanyRepInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/company-reps/${initialUser.user}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyRep", user: arg.user },
      ],
    }),
    deleteCompanyRepInfo: builder.mutation({
      query: (user) => ({
        url: `/users/company-reps/${user}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyRep", user: arg.user },
      ],
    }),
  }),
});

export const {
  useGetCompanyRepsQuery,
  useGetCompanyRepByCompanyRepIdQuery,
  useAddNewCompanyRepMutation,
  useMutateCompanyRepInfoMutation,
  useChangeCompanyRepInfoMutation,
  useDeleteCompanyRepInfoMutation,
} = companyRepApiSlice;

export const selectCompanyRepsResult =
  companyRepApiSlice.endpoints.getCompanyReps.select();

export const selectCompanyRepsData = createSelector(
  selectCompanyRepsResult,
  (companyRepsResult) => companyRepsResult.data
);

export const {
  selectAll: selectAllCompanyReps,
  selectById: selectCompanyRepById,
  selectIds: selectCompanyRepIds,
} = companyRepAdapter.getSelectors(
  (state) => selectCompanyRepsData(state) ?? initialState
);
