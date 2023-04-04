import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../authSlice/jwtAuthSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const tokens = getState().auth.tokens;
    if (tokens) headers.set("authorization", `Bearer ${tokens.access}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery("/token/refresh/", api, extraOptions);
    console.log({ refreshResult });
    if (refreshResult?.data) {
      const user_id = api.getState().auth.user_id;
      api.dispatch(setCredentials({ ...refreshResult.data, user_id }));
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
