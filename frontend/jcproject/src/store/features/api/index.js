import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../authSlice/jwtAuthSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const tokens = getState().auth.tokens
    if (tokens) headers.set('Authorization', `Bearer ${tokens.access}`)
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401) {
    const { user_id, tokens, user_type } = api.getState().auth
    let refresh = null
    if (localStorage.getItem('CONSULT_KEY'))
      refresh = localStorage.getItem('CONSULT_KEY')
    else refresh = tokens.refresh
    const refreshResult = await baseQuery(
      {
        url: '/token/refresh/',
        method: 'POST',
        body: {
          refresh,
        },
      },
      api,
      extraOptions,
    )
    if (refreshResult?.data.data) {
      const { access } = refreshResult.data.data
      api.dispatch(
        setCredentials({
          tokens: { ...tokens, access },
          user_id,
          user_type,
        }),
      )
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'JobSeeker',
    'CompanyInfo',
    'CompanyRep',
    'Staff',
    'Job',
    'JobRequirement',
    'JobResponsibility',
    'JobApplication',
    'JobApproval',
    'Applications',
    'ApplicantDoc',
    'Sector',
    'Choices',
    'Nationality',
    'Cities',
    'Countries',
    'ApplicationDoc',
  ],
  endpoints: (builder) => ({}),
})
