import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  companyId?: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface CreateCompanyResponse {
  success: boolean;
  company: Company;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, Record<string, string>>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, Record<string, string>>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    createCompany: builder.mutation<CreateCompanyResponse, { name: string }>({
      query: (body) => ({
        url: "/companies",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useCreateCompanyMutation } = authApi;
