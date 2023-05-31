import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const choicesAdapter = createEntityAdapter();

const initialState = choicesAdapter.getInitialState();

export const choicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGenricChoice: builder.query({
        query: (choice) => `/choices/${choice}`,
        providesTags: (result, error, arg) => [{ type: "Choices", choice:arg.choice }],
      }),
  }),
});

export const {
  useGetGenricChoiceQuery
} = choicesApiSlice;
