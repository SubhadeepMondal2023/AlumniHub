import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from './baseQuery';

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => '/api/notifications',
      transformResponse: (response) => response.data
    }),
    markAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/api/notifications/${notificationId}/read`,
        method: "PUT",
      }),
    }),
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/api/notifications/${notificationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkAsReadMutation, useDeleteNotificationMutation } = notificationsApi;
