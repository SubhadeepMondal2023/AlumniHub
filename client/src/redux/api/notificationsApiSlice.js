import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  prepareHeaders: (headers, { url }) => {
    const token = localStorage.getItem('token');
    if(token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query:()=> ({
        url :`/notification/get-all-notification`,
      })
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
