import { apiSlice } from "../api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerNewUser: builder.mutation({
      query: (initialUser) => ({
        url: "/users/register/",
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
    }),
    loginUser: builder.mutation({
      query: (initialUser) => ({
        url: "/users/login/",
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
    }),
    logoutUser: builder.mutation({
      query: (initialUser) => ({
        url: "/users/logout/",
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
    }),
    passwordResetComplete: builder.mutation({
      query: (initialUser) => ({
        url: "/users/password-reset-complete/",
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
    }),
    passwordReset: builder.mutation({
      query: (initialUser) => ({
        url:
          "/users/password-reset/" +
          initialUser.uidb64 +
          "/" +
          initialUser.token +
          "/",
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (initialUser) => ({
        url: "/users/request-password-reset/",
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
    }),
    createNewAccessToken: builder.mutation({
      query: (initialUser) => ({
        url: "/users/token/refresh/",
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (initialUser) => ({
        url: "/users/verify-email/",
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
    }),
  }),
});

export const {
  useRegisterNewUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  usePasswordResetCompleteMutation,
  useRequestPasswordResetMutation,
  useCreateNewAccessTokenMutation,
  usePasswordResetMutation,
  useVerifyEmailMutation,
} = authApiSlice;
