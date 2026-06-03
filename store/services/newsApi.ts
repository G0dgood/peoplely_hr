import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  shareWith: string; // "everyone" | "department" | "specific"
  status: "PUBLISHED" | "DRAFT";
  authorName: string;
  authorAvatar: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetNewsFilters {
  companyId?: string;
  status?: string;
  search?: string;
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getNews: builder.query<{ news: NewsItem[] }, GetNewsFilters | void>({
      query: (params) => ({
        url: "/news",
        params: params || undefined,
      }),
      providesTags: ["News"],
    }),
    getNewsItem: builder.query<{ newsItem: NewsItem }, string>({
      query: (id) => `/news/${id}`,
      providesTags: (result, error, id) => [{ type: "News", id }],
    }),
    createNews: builder.mutation<{ newsItem: NewsItem }, Partial<NewsItem>>({
      query: (body) => ({
        url: "/news",
        method: "POST",
        body,
      }),
      invalidatesTags: ["News"],
    }),
    updateNews: builder.mutation<{ newsItem: NewsItem }, { id: string } & Partial<NewsItem>>({
      query: ({ id, ...body }) => ({
        url: `/news/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "News", id }, "News"],
    }),
    deleteNews: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetNewsItemQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
