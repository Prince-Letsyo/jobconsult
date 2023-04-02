import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const companyInfoAdapter = createEntityAdapter();

const initialState = companyInfoAdapter.getInitialState();

export const companyInfoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyInfos: builder.query({
      query: () => "/users/company-info/",
      providesTags: (result, error, arg) => [
        { type: "CompanyInfo", id: "LIST" },
        ...result.data.map((id) => ({ type: "CompanyInfo", id })),
      ],
    }),
    getCompanyInfoByCompanyInfoId: builder.query({
      query: (id) => `/users/company-info/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.data.map((id) => ({ type: "CompanyInfo", id })),
      ],
    }),
    addNewCompanyInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/company-info/`,
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: [{ type: "CompanyInfo", id: "LIST" }],
    }),
    changeCompanyInfoInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/company-info/${initialUser.id}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyInfo", id: arg.id },
      ],
    }),
    mutateCompanyInfoInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/company-info/${initialUser.id}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyInfo", id: arg.id },
      ],
    }),
    deleteCompanyInfoInfo: builder.mutation({
      query: (id) => ({
        url: `/users/company-info/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyInfo", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCompanyInfosQuery,
  useGetCompanyInfoByCompanyInfoIdQuery,
  useAddNewCompanyInfoMutation,
  useMutateCompanyInfoInfoMutation,
  useChangeCompanyInfoInfoMutation,
  useDeleteCompanyInfoInfoMutation,
} = companyInfoApiSlice;

export const selectCompanyInfosResult =
  companyInfoApiSlice.endpoints.getCompanyInfos.select();

export const selectCompanyInfosData = createSelector(
  selectCompanyInfosResult,
  (companyInfosResult) => companyInfosResult.data
);

export const {
  selectAll: selectAllCompanyInfos,
  selectById: selectCompanyInfoById,
  selectIds: selectCompanyInfoIds,
} = companyInfoAdapter.getSelectors(
  (state) => selectCompanyInfosData(state) ?? initialState
);
