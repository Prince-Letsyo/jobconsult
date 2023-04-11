import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import {
  logOut,
  setCredentials,
  selectTokens,
} from "../authSlice/jwtAuthSlice";
import { useDispatch, useSelector } from "react-redux";

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
    console.log("sending refresh token");
    const { user_id, tokens } = api.getState().auth;
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
    console.log({ ...refreshResult });
    if (refreshResult?.data) {
      const { access } = refreshResult.data;
      api.dispatch(
        setCredentials({
          tokens: { ...tokens, access },
          user_id,
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
  ],
  endpoints: (builder) => ({}),
});
