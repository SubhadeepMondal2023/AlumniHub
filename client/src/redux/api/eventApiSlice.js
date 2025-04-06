import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const eventApiSlice = createApi({
  reducerPath: 'eventApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => '/api/events',
    }),
    getEventById: builder.query({
      query: (eventId) => `/api/events/${eventId}`,
    }),
    attendEvent: builder.mutation({
      query: (eventId) => ({
        url: `/api/events/${eventId}/attend`,
        method: 'POST',
      }),
    }),
    getMyEvents: builder.query({
      query: () => '/api/events/my-events',
    }),
    getAttendingEvents: builder.query({
      query: () => '/api/events/attending',
    }),
  }),
});

export const { 
  useGetEventsQuery, 
  useGetEventByIdQuery, 
  useAttendEventMutation, 
  useGetMyEventsQuery,
  useGetAttendingEventsQuery 
} = eventApiSlice;
