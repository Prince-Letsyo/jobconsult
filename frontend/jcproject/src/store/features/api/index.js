import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../authSlice/jwtAuthSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const tokens = getState().auth.tokens;
    if (tokens) headers.set("Authorization", `Bearer ${tokens.access}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.meta?.response.status === 401) {
    const { user_id, tokens, user_type } = api.getState().auth;
    const refreshResult = await baseQuery(
      {
        url: "/token/refresh/",
        method: "POST",
        body: {
          refresh: tokens.refresh,
        },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const { access } = refreshResult.data;
      api.dispatch(
        setCredentials({
          tokens: { ...tokens, access },
          user_id,
          user_type,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "JobSeeker",
    "CompanyInfo",
    "CompanyRep",
    "Staff",
    "Job",
    "JobRequirement",
    "JobResponsibility",
    "JobApplication",
    "ApplicantDoc",
    "Sector",
    "Choices",
  ],
  endpoints: (builder) => ({
    getGenricChoice: builder.query({
      query: (choice) => `/users/choices/${choice}`,
      providesTags: (result, error, arg) => [{ type: "Choices", choice:arg.choice }],
    }),
  }),
});

export const { useGetGenricChoiceQuery } = apiSlice;
