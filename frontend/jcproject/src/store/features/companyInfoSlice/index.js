import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import { formDataToObject } from "@/utils";

const companyInfoAdapter = createEntityAdapter();

const initialState = companyInfoAdapter.getInitialState();

export const companyInfoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyInfos: builder.query({
      query: () => "/users/company-info/",
      providesTags: (result, error, arg) => [
        { type: "CompanyInfo", representative: "LIST" },
        ...result.data.map((representative) => ({
          type: "CompanyInfo",
          representative,
        })),
      ],
    }),
    getCompanyInfoByCompanyInfoId: builder.query({
      query: (representative) => `/users/company-info/${representative}/`,
      providesTags: (result, error, arg) => [
        {
          type: "CompanyInfo",
          representative: arg.representative,
        },
      ],
    }),
    addNewCompanyInfo: builder.mutation({
      query: (initialUser) => {
        return {
          url: `/users/company-info/`,
          method: "POST",
          body: initialUser,
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        };
      },
      invalidatesTags: [{ type: "CompanyInfo", representative: "LIST" }],
    }),
    changeCompanyInfoInfo: builder.mutation({
      query: (data) => ({
        url: `/users/company-info/${formDataToObject(data).representative}/`,
        method: "PUT",
        body: data,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "CompanyInfo",
          representative: formDataToObject(arg).representative,
        },
      ],
    }),
    mutateCompanyInfoInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/company-info/${initialUser.representative}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyInfo", representative: arg.representative },
      ],
    }),
    deleteCompanyInfoInfo: builder.mutation({
      query: (representative) => ({
        url: `/users/company-info/${representative}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompanyInfo", representative: arg.representative },
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
