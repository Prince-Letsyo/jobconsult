import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const ApplicationAdapter = createEntityAdapter();

const initialState = ApplicationAdapter.getInitialState();

export const ApplicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query({
      query: () => "/applications/applications/",
      providesTags: (result, error, arg) => [
        { type: "Applications", id: "LIST" },
        ...result.data.map((id) => ({ type: "Applications", id })),
      ],
    }),
    getApplicationByApplicationId: builder.query({
      query: (id) => `/applications/applications/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.data.map((id) => ({ type: "Applications", id })),
      ],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationByApplicationIdQuery

} = ApplicationApiSlice;

export const selectApplicationsResult =
  ApplicationApiSlice.endpoints.getApplications.select();

export const selectApplicationsData = createSelector(
  selectApplicationsResult,
  (ApplicationsResult) => ApplicationsResult.data
);

export const {
  selectAll: selectAllApplications,
  selectById: selectApplicationById,
  selectIds: selectApplicationIds,
} = ApplicationAdapter.getSelectors(
  (state) => selectApplicationsData(state) ?? initialState
);

