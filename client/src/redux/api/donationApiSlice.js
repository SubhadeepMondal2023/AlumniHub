import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/',
  prepareHeaders: (headers, { url }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      
    }
    return headers;
  },
});

export const donationApi = createApi({
  reducerPath: "donationApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Donations"],
  endpoints: (builder) => ({
    fetchDonations: builder.query({
      query: () => "/donations",
      providesTags: ["Donations"],
    }),
    fetchDonationById: builder.query({
      query: (donationId) => `/donation/${donationId}`,
    }),
    getMyDonations: builder.query({
      query: () => ({
        url: "/donations/history",
      }),
    }),
    
    createDonation: builder.mutation({
      query: (donation) => ({
        url: "/donations",
        method: "POST",
        body: donation,
      }),
      invalidatesTags: ["Donations"],
    }),
  }),
});

export const { useFetchDonationsQuery,useGetMyDonationsQuery,
  useFetchDonationByIdQuery, useCreateDonationMutation } = donationApi;