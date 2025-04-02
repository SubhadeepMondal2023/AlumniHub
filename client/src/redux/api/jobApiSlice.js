import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const jobApiSlice = createApi({
  reducerPath: 'jobApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Jobs','applications'],
  endpoints: (builder) => ({
    fetchAllJobs: builder.query({
      query: () => '/api/jobs/search',
      providesTags: ['Jobs'],
    }),
    fetchJobById: builder.query({
      query: (jobId) => `/api/jobs/${jobId}`,
    }),
    findAppliedJobsByUserId: builder.query({
      query: (userId) => `/api/jobs/${userId}/applications`,
      providesTags: ['applications'],
    }),
    createJobPost: builder.mutation({
      query: (jobPost) => ({
        url: '/api/jobs',
        method: 'POST',
        body: jobPost,
      }),
    }),
    applyToJob: builder.mutation({
      query: (jobId) => ({
        url: `/api/jobs/${jobId}/apply`,
        method: 'POST',
      }),
    }),
    updateJobPost: builder.mutation({
      query: ({ jobId, jobPost }) => ({
        url: `/api/jobs/${jobId}`,
        method: 'PUT',
        body: jobPost,
      }),
    }),
    deleteJobPost: builder.mutation({
      query: (jobId) => ({
        url: `/api/jobs/delete/${jobId}`,
        method: 'DELETE',
        invalidatesTags: ['Jobs'],
      }),
    }),
    withdrawApplication: builder.mutation({
      query: (jobId) => ({
        url: `/api/jobs/${jobId}/withdraw-application`,
        method: 'DELETE',
        invalidatesTags: ['applications'],
      })
    })
  }),
});

export const { useFetchAllJobsQuery, useFetchJobByIdQuery, useCreateJobPostMutation,
  useUpdateJobPostMutation, useDeleteJobPostMutation, useApplyToJobMutation, 
  useFindAppliedJobsByUserIdQuery, useWithdrawApplicationMutation
} = jobApiSlice;
