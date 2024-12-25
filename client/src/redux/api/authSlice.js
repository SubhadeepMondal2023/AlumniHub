import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  prepareHeaders: (headers, { url }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi', 
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Auth'], 
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => '/api/profile',
      providesTags: ['Auth'],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.jwt);
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }), 
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.jwt);
        } catch (error) {
          console.error('Registration failed:', error);
        }
      },
    }),
  }),
});

export const { useGetMyProfileQuery, useLoginUserMutation, useRegisterUserMutation } = authApi;
