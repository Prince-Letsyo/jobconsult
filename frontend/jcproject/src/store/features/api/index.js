import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pletsyo.pythonanywhere.com/" }),
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
  ],
  endpoints: (builder) => ({}),
});
