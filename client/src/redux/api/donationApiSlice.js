import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from './baseQuery.js';

export const donationApi = createApi({
  reducerPath: "donationApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Donations"],
  endpoints: (builder) => ({
    fetchDonations: builder.query({
      query: () => "/api/donations",
      providesTags: ["Donations"],
    }),
    fetchDonationById: builder.query({
      query: (donationId) => `/api/donation/${donationId}`,
    }),
    getMyDonations: builder.query({
      query: () => "/api/donations/history",
    }),
    createDonation: builder.mutation({
      query: (donation) => ({
        url: "/api/donations",
        method: "POST",
        body: donation,
      }),
      invalidatesTags: ["Donations"],
    }),
  }),
});

export const { useFetchDonationsQuery, useGetMyDonationsQuery,
  useFetchDonationByIdQuery, useCreateDonationMutation } = donationApi;