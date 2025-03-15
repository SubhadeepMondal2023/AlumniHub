import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isTokenValid } from '../../utils/jwtValidator';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/jobs',
  prepareHeaders: (headers, { url }) => {
    const token = localStorage.getItem('token');

    if (token && isTokenValid(token)) {
      headers.set('Authorization', `Bearer ${token}`);
    }else {
      localStorage.removeItem('token');
    }
    return headers;
  }
});

export const jobApiSlice = createApi({
  reducerPath: 'jobApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    fetchAllJobs: builder.query({
        query: () => '/search',

    }),
    fetchJobById: builder.query({
      query: (jobId) => `/${jobId}`,
    }),
    findAppliedJobsByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}/applications`,
      }),
    }),
    createJobPost: builder.mutation({
      query: (jobPost) => ({
        url: '/',
        method: 'POST',
        body: jobPost,
      }),
    }),
    applyToJob: builder.mutation({
      query: (jobId) => ({
        url: `/${jobId}/apply`,
        method: 'POST',
      }),
    }),
    updateJobPost: builder.mutation({
      query: ({ jobId, jobPost }) => ({
        url: `/${jobId}`,
        method: 'PUT',
        body: jobPost,
      }),
    }),
    deleteJobPost: builder.mutation({
      query: (jobId) => ({
        url: `/delete/${jobId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useFetchAllJobsQuery, useFetchJobByIdQuery, useCreateJobPostMutation,
  useUpdateJobPostMutation, useDeleteJobPostMutation, useApplyToJobMutation, 
  useFindAppliedJobsByUserIdQuery,
 } = jobApiSlice;
