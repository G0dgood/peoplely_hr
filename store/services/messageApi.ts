import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Conversation, Message } from "@/app/message/page";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["Conversation", "Message"],
  endpoints: (builder) => ({
    getConversations: builder.query<{ conversations: Conversation[] }, string>({
      query: (userId) => `/conversations?userId=${userId}`,
      providesTags: ["Conversation"],
    }),
    getMessages: builder.query<{ messages: Message[] }, string>({
      query: (conversationId) => `/conversations/${conversationId}/messages`,
      providesTags: (result, error, id) => [{ type: "Message", id }],
    }),
    createConversation: builder.mutation<any, any>({
      query: (body) => ({
        url: "/conversations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Conversation"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useCreateConversationMutation,
} = messageApi;
