import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  manager: string;
  department: string;
  office: string;
  status: string;
  account: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetEmployeesFilters {
  search?: string;
  office?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
  companyId?: string;
}

export interface GetEmployeesResponse {
  employees: Employee[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api" }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getEmployees: builder.query<GetEmployeesResponse, GetEmployeesFilters | void>({
      query: (params) => ({
        url: "/employees",
        params: params || undefined,
      }),
      providesTags: ["Employee"],
    }),
    createEmployee: builder.mutation<{ employee: Employee }, Partial<Employee>>({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation<{ employee: Employee }, { id: string; body: Partial<Employee> }>({
      query: ({ id, body }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
    getEmployee: builder.query<{ employee: Employee }, { id: string; companyId?: string }>({
      query: ({ id, companyId }) => ({
        url: `/employees/${id}`,
        params: companyId ? { companyId } : undefined,
      }),
      providesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
} = employeesApi;
