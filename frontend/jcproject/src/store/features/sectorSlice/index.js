import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const sectorAdapter = createEntityAdapter();

const initialState = sectorAdapter.getInitialState();

export const sectorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSectors: builder.query({
      query: () => "/users/sectors/",
      providesTags: (result, error, arg) => [
        { type: "Sector", id: "LIST" },
        ...result.data.map((id) => ({ type: "Sector", id })),
      ],
    }),
    getSectorBySectorId: builder.query({
      query: (id) => `/users/sectors/${id}/`,
      providesTags: (result, error, arg) => [
        ...result.data.map((id) => ({ type: "Sector", id })),
      ],
    }),
    addNewSector: builder.mutation({
      query: (initialUser) => ({
        url: `/users/sectors/`,
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: [{ type: "Sector", id: "LIST" }],
    }),
    changeSectorInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/sectors/${initialUser.id}/`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Sector", id: arg.id }],
    }),
    mutateSectorInfo: builder.mutation({
      query: (initialUser) => ({
        url: `/users/sectors/${initialUser.id}/`,
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Sector", id: arg.id }],
    }),
    deleteSectorInfo: builder.mutation({
      query: (id) => ({
        url: `/users/sectors/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Sector", id: arg.id }],
    }),
  }),
});

export const {
  useGetSectorsQuery,
  useDeleteSectorInfoMutation,
  useAddNewSectorMutation,
  useChangeSectorInfoMutation,
  useGetSectorBySectorIdQuery,
  useMutateSectorInfoMutation,
} = sectorApiSlice;

export const selectSectorsResult = sectorApiSlice.endpoints.getSectors.select();

export const selectSectorsData = createSelector(
  selectSectorsResult,
  (sectorsResult) => sectorsResult.data
);

export const {
  selectAll: selectAllSectors,
  selectById: selectSectorById,
  selectIds: selectSectorIds,
} = sectorAdapter.getSelectors(
  (state) => selectSectorsData(state) ?? initialState
);
