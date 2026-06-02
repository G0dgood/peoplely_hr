import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface JobTitle {
  id: string;
  title: string;
  active: boolean;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

export const jobTitleApi = createApi({
  reducerPath: "jobTitleApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api" }),
  tagTypes: ["JobTitle"],
  endpoints: (builder) => ({
    getJobTitles: builder.query<{ jobTitles: JobTitle[] }, { search?: string; companyId?: string } | void>({
      query: (params) => ({
        url: "/job-titles",
        params: params || undefined,
      }),
      providesTags: ["JobTitle"],
    }),
    createJobTitle: builder.mutation<{ jobTitle: JobTitle }, Partial<JobTitle>>({
      query: (body) => ({
        url: "/job-titles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["JobTitle"],
    }),
    updateJobTitle: builder.mutation<{ jobTitle: JobTitle }, { id: string; body: Partial<JobTitle> }>({
      query: ({ id, body }) => ({
        url: `/job-titles/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["JobTitle"],
    }),
    deleteJobTitle: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/job-titles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["JobTitle"],
    }),
  }),
});

export const {
  useGetJobTitlesQuery,
  useCreateJobTitleMutation,
  useUpdateJobTitleMutation,
  useDeleteJobTitleMutation,
} = jobTitleApi;
