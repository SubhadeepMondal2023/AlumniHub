import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isTokenValid } from '../../utils/jwtValidator';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  prepareHeaders: (headers, { url }) => {
    const token = localStorage.getItem('token');

    if (token && isTokenValid(token)) {
      headers.set('Authorization', `Bearer ${token}`);
    }else {
      
      localStorage.removeItem('token');
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi', 
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Auth', 'Profile'], 
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => '/api/profile',
      providesTags: ['Profile'],
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
    registerUserSendOtp: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register/send-otp',
        method: 'POST',
        body: credentials,
      }), 
      
    }),
    registerUserVerifyOtp: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register/confirm',
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
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: '/api/user/update-profile',
        method: 'PUT',
        body: credentials,
      }),
      invalidatesTags: ['Profile']
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: '/api/user/delete',
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile']
    }),
    logoutUser: builder.mutation({  
      query: () => ({
        url: '/api/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('token');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
  }),
});

export const { useGetMyProfileQuery, useLoginUserMutation, useRegisterUserSendOtpMutation, 
  useRegisterUserVerifyOtpMutation, useLogoutUserMutation,
  useUpdateUserMutation, useDeleteProfileMutation } = authApi;
