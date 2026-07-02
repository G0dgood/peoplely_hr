import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  unread: boolean;
  createdAt: string;
  updatedAt: string;
}

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    getNotifications: builder.query<{ notifications: Notification[] }, { userId: string }>({
      query: ({ userId }) => `/notifications?userId=${userId}`,
      providesTags: ["Notification"],
    }),
    markAsRead: builder.mutation<{ success: boolean; notification: Notification }, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAllAsRead: builder.mutation<{ success: boolean }, { userId: string }>({
      query: (body) => ({
        url: "/notifications/read-all",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
    clearAllNotifications: builder.mutation<{ success: boolean }, { userId: string }>({
      query: (body) => ({
        url: "/notifications/clear-all",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
} = notificationApi;
