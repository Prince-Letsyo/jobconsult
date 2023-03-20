import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const companyRepAdapter = createEntityAdapter();

const initialState = companyRepAdapter.getInitialState();

export const companyRepApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyReps: builder.query({
      query: () => "/users/company-reps/",
      providesTags: (result, error, arg) => [
        { type: "CompanyRep", id: "LIST" },
        ...result.data.map((id) => ({ type: "CompanyRep", id })),
      ],
    }),
    getCompanyRepByCompanyRepId: builder.query({
      query: (id) => `/users/company-reps/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.data.map((id) => ({ type: "CompanyRep", id })),
      ],
    }),
    addNewCompanyRep: builder.mutation({
      query: (initialUser) => ({
        url: `/users/company-reps/`,
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    changeCompanyRepInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/company-reps/${initialUser.id}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyRep", id: arg.id },
      ],
    }),
    mutateCompanyRepInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/company-reps/${initialUser.id}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyRep", id: arg.id },
      ],
    }),
    deleteCompanyRepInfo: builder.mutation({
      query: (id) => ({
        url: `/users/company-reps/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyRep", id: arg.id },
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
