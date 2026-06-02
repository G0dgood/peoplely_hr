import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Company {
  id: string;
  name: string;
  website?: string;
  phone?: string;
  email?: string;
  overview?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getCompany: builder.query<{ company: Company }, string>({
      query: (id) => `/companies/${id}`,
      providesTags: (result, error, id) => [{ type: "Company", id }],
    }),
    updateCompany: builder.mutation<{ company: Company }, { id: string; body: Partial<Company> }>({
      query: ({ id, body }) => ({
        url: `/companies/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Company", id }],
    }),
  }),
});

export const { useGetCompanyQuery, useUpdateCompanyMutation } = companyApi;
