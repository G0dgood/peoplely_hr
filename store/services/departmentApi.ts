import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Department {
  id: string;
  name: string;
  parentDept: string;
  description: string;
  leader: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api" }),
  tagTypes: ["Department"],
  endpoints: (builder) => ({
    getDepartments: builder.query<{ departments: Department[] }, { companyId?: string } | void>({
      query: (params) => ({
        url: "/departments",
        params: params || undefined,
      }),
      providesTags: ["Department"],
    }),
    createDepartment: builder.mutation<{ department: Department }, Partial<Department>>({
      query: (body) => ({
        url: "/departments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation<{ department: Department }, { id: string; body: Partial<Department> }>({
      query: ({ id, body }) => ({
        url: `/departments/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
