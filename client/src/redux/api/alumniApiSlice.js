import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const alumniApi = createApi({
  reducerPath: 'alumniApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Alumni'],
  endpoints: (builder) => ({
    fetchAlumni: builder.query({
      query: (params) => ({
        url: '/alumni',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.alumni.map(({ AlumniID }) => ({ type: 'Alumni', id: AlumniID })),
              { type: 'Alumni', id: 'LIST' },
            ]
          : [{ type: 'Alumni', id: 'LIST' }],
    }),
    deleteAlumni: builder.mutation({
      query: (alumniId) => ({
        url: `/alumni/${alumniId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, alumniId) => [{ type: 'Alumni', id: alumniId }],
    }),
    fetchAlumniById: builder.query({
      query: (alumniId) => `/alumni/${alumniId}`,
      providesTags: (result, error, alumniId) => [{ type: 'Alumni', id: alumniId }],
    }),
  }),
});

export const {
  useFetchAlumniQuery,
  useDeleteAlumniMutation,
  useFetchAlumniByIdQuery,
} = alumniApi;
