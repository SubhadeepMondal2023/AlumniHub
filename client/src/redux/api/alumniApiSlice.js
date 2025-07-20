import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'https://alumnihub-production.up.railway.app/api',
  prepareHeaders: (headers, { url }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      
    }
    return headers;
  },
});

export const alumniApi = createApi({
  reducerPath: "alumniApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Alumni"],
  endpoints: (builder) => ({
    fetchAlumni: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters?.designation) params.append('designation', filters.designation);
        if (filters?.location) params.append('location', filters.location);
        if (filters?.degree) params.append('degree', filters.degree);
        if (filters?.currentCompany) params.append('currentCompany', filters.currentCompany);
        if (filters?.yoe) params.append('yoe', filters.yoe);
        if (filters?.searchByName) params.append('searchByName', filters.searchByName);
        return `/alumni?${params.toString()}`;
      },
    }),
    deleteAlumni: builder.mutation({
      query: (alumniId) => ({
        url: `/alumni/${alumniId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, alumniId) => [{ type: "Alumni", id: alumniId }],
    }),
    fetchAlumniById: builder.query({
      query: (alumniId) => `/alumni/${alumniId}`,
      providesTags: (result, error, alumniId) => [{ type: "Alumni", id: alumniId }],
    }),
  }),
});

export const {
  useFetchAlumniQuery,
  useDeleteAlumniMutation,
  useFetchAlumniByIdQuery,
} = alumniApi;
