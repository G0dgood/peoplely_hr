import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TemplateTask {
  id: string;
  name: string;
  tag: "CHECKLIST" | "UPLOAD" | "EMPLOYEE INFORMATION";
  assignee: string;
  dueDate: string;
  description: string;
  templateId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  description: string;
  type: "onboarding" | "offboarding";
  companyId?: string;
  tasks?: TemplateTask[];
  createdAt?: string;
  updatedAt?: string;
}

export const checklistTemplatesApi = createApi({
  reducerPath: "checklistTemplatesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["ChecklistTemplate", "TemplateTask"],
  endpoints: (builder) => ({
    getChecklistTemplates: builder.query<{ checklistTemplates: ChecklistTemplate[] }, { companyId?: string; type?: string } | void>({
      query: (params) => ({
        url: "/checklist-templates",
        params: params || undefined,
      }),
      providesTags: ["ChecklistTemplate"],
    }),
    getChecklistTemplate: builder.query<{ checklistTemplate: ChecklistTemplate }, string>({
      query: (id) => `/checklist-templates/${id}`,
      providesTags: (result, error, id) => [{ type: "ChecklistTemplate", id }],
    }),
    createChecklistTemplate: builder.mutation<{ checklistTemplate: ChecklistTemplate }, Partial<ChecklistTemplate>>({
      query: (body) => ({
        url: "/checklist-templates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ChecklistTemplate"],
    }),
    deleteChecklistTemplate: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/checklist-templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChecklistTemplate"],
    }),
    getTemplateTasks: builder.query<{ tasks: TemplateTask[] }, string>({
      query: (templateId) => `/checklist-templates/${templateId}/tasks`,
      providesTags: (result, error, templateId) => [{ type: "TemplateTask", id: templateId }],
    }),
    createTemplateTask: builder.mutation<{ task: TemplateTask }, { templateId: string; name: string; tag: string; assignee: string; dueDate: string; description?: string }>({
      query: ({ templateId, ...body }) => ({
        url: `/checklist-templates/${templateId}/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { templateId }) => [
        { type: "TemplateTask", id: templateId },
        "ChecklistTemplate",
      ],
    }),
    updateTemplateTask: builder.mutation<{ task: TemplateTask }, { id: string; templateId: string; name?: string; tag?: string; assignee?: string; dueDate?: string; description?: string }>({
      query: ({ id, templateId, ...body }) => ({
        url: `/checklist-template-tasks/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { templateId }) => [
        { type: "TemplateTask", id: templateId },
        "ChecklistTemplate",
      ],
    }),
    deleteTemplateTask: builder.mutation<{ success: boolean; message: string }, { id: string; templateId: string }>({
      query: ({ id }) => ({
        url: `/checklist-template-tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { templateId }) => [
        { type: "TemplateTask", id: templateId },
        "ChecklistTemplate",
      ],
    }),
  }),
});

export const {
  useGetChecklistTemplatesQuery,
  useGetChecklistTemplateQuery,
  useCreateChecklistTemplateMutation,
  useDeleteChecklistTemplateMutation,
  useGetTemplateTasksQuery,
  useCreateTemplateTaskMutation,
  useUpdateTemplateTaskMutation,
  useDeleteTemplateTaskMutation,
} = checklistTemplatesApi;
