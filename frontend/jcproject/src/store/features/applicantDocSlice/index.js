import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const applicationDocAdapter = createEntityAdapter();

const initialState = applicationDocAdapter.getInitialState();

export const applicationDocApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationDocs: builder.query({
      query: () => "/applications/applicant-docs/",
      transformResponse: (responseData) => {
        return applicationDocAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "ApplicationDoc", id: "LIST" },
        ...result.ids.map((id) => ({ type: "ApplicationDoc", id })),
      ],
    }),
    getApplicationDocByApplicationDocId: builder.query({
      query: (id) => `/applications/applicant-docs/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "ApplicationDoc", id })),
      ],
    }),
    addNewApplicationDoc: builder.mutation({
      query: (initialUser) => `/applications/applicant-docs/`,
      method: "POST",
      body: {
        ...initialUser,
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    changeApplicationDocInfo: builder.mutation({
      query: (initialUser) => `/applications/applicant-docs/${initialUser.id}/`,
      method: "PUT",
      body: {
        ...initialUser,
      },
      invalidatesTags: (result, error, arg) => [
        { type: "ApplicationDoc", id: arg.id },
      ],
    }),
    mutateApplicationDocInfo: builder.mutation({
      query: (initialUser) => `/applications/applicant-docs/${initialUser.id}/`,
      method: "PATCH",
      body: {
        ...initialUser,
      },
      invalidatesTags: (result, error, arg) => [
        { type: "ApplicationDoc", id: arg.id },
      ],
    }),
    deleteApplicationDocInfo: builder.mutation({
      query: (id) => `/applications/applicant-docs/${id}/`,
      method: "DELETE",
      invalidatesTags: (result, error, arg) => [
        { type: "ApplicationDoc", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetApplicationDocsQuery,
  useGetApplicationDocByApplicationDocIdQuery,
  useAddNewApplicationDocMutation,
  useMutateApplicationDocInfoMutation,
  useChangeApplicationDocInfoMutation,
  useDeleteApplicationDocInfoMutation,
} = applicationDocApiSlice;

export const selectApplicationDocsResult = applicationDocApiSlice.endpoints.getApplicationDocs.select();

export const selectApplicationDocsData = createSelector(
  selectApplicationDocsResult,
  (applicationDocsResult) => applicationDocsResult.data
);

export const {
  selectAll: selectAllApplicationDocs,
  selectById: selectApplicationDocById,
  selectIds: selectApplicationDocIds,
} = applicationDocAdapter.getSelectors(
  (state) => selectApplicationDocsData(state) ?? initialState
);
