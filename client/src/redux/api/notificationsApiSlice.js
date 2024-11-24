import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { notificationsData } from "../../utils/Links";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => notificationsData, 
    }),
    markAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: "PUT",
      }),
    }),
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkAsReadMutation, useDeleteNotificationMutation } = notificationsApi;
