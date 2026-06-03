import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChecklistTask {
  id: string;
  taskName: string;
  dueDate: string;
  employeeName: string;
  employeeAvatar: string;
  employeeInitials?: string;
  type: string;
  completed: boolean;
  description?: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

export const checklistTasksApi = createApi({
  reducerPath: "checklistTasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["ChecklistTask"],
  endpoints: (builder) => ({
    getChecklistTasks: builder.query<{ checklistTasks: ChecklistTask[] }, { companyId?: string; search?: string; status?: string } | void>({
      query: (params) => ({
        url: "/checklist-tasks",
        params: params || undefined,
      }),
      providesTags: ["ChecklistTask"],
    }),
    createChecklistTask: builder.mutation<{ checklistTask: ChecklistTask }, Partial<ChecklistTask>>({
      query: (body) => ({
        url: "/checklist-tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ChecklistTask"],
    }),
    updateChecklistTask: builder.mutation<{ checklistTask: ChecklistTask }, { id: string; completed?: boolean; taskName?: string; dueDate?: string; employeeName?: string; description?: string }>({
      query: ({ id, ...body }) => ({
        url: `/checklist-tasks/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ChecklistTask"],
    }),
    deleteChecklistTask: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/checklist-tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChecklistTask"],
    }),
  }),
});

export const {
  useGetChecklistTasksQuery,
  useCreateChecklistTaskMutation,
  useUpdateChecklistTaskMutation,
  useDeleteChecklistTaskMutation,
} = checklistTasksApi;
