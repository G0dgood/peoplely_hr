import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Office {
  id: string;
  name: string;
  location: string;
  description: string;
  isHQ: boolean;
  active: boolean;
  timezone: string;
  phone: string;
  email: string;
  headOfOffice: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

export const officeApi = createApi({
  reducerPath: "officeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api" }),
  tagTypes: ["Office"],
  endpoints: (builder) => ({
    getOffices: builder.query<{ offices: Office[] }, { companyId?: string } | void>({
      query: (params) => ({
        url: "/offices",
        params: params || undefined,
      }),
      providesTags: ["Office"],
    }),
    createOffice: builder.mutation<{ office: Office }, Partial<Office>>({
      query: (body) => ({
        url: "/offices",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Office"],
    }),
    updateOffice: builder.mutation<{ office: Office }, { id: string; body: Partial<Office> }>({
      query: ({ id, body }) => ({
        url: `/offices/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Office"],
    }),
    deleteOffice: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/offices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Office"],
    }),
  }),
});

export const {
  useGetOfficesQuery,
  useCreateOfficeMutation,
  useUpdateOfficeMutation,
  useDeleteOfficeMutation,
} = officeApi;
