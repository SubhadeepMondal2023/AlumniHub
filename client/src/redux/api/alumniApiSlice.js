import { createApi } from "@reduxjs/toolkit/query/react";
import { testAlumniData } from "../../utils/Links";

export const alumniApi = createApi({
  reducerPath: "alumniApi",
  baseQuery: async () => ({ data: testAlumniData }), // Mock API call
  tagTypes: ["Alumni"],
  endpoints: (builder) => ({
    fetchAlumni: builder.query({
      query: () => "/alumni",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ AlumniID }) => ({ type: "Alumni", id: AlumniID })),
              { type: "Alumni", id: "LIST" },
            ]
          : [{ type: "Alumni", id: "LIST" }],
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
