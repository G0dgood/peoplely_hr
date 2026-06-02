import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface WorkScheduleDay {
  id: string;
  day: string;
  hours: string;
  active: boolean;
  workScheduleId: string;
}

export interface WorkSchedule {
  id: string;
  title: string;
  isDefault: boolean;
  active: boolean;
  standardHours: string;
  effectiveFrom: string;
  type: string;
  totalHours: string;
  companyId?: string;
  dailyHours: WorkScheduleDay[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkSchedulePayload {
  title: string;
  isDefault?: boolean;
  active?: boolean;
  standardHours?: string;
  effectiveFrom: string;
  type?: string;
  totalHours?: string;
  companyId?: string;
  dailyHours?: { day: string; hours: string; active?: boolean }[];
}

export const workScheduleApi = createApi({
  reducerPath: "workScheduleApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api" }),
  tagTypes: ["WorkSchedule"],
  endpoints: (builder) => ({
    getWorkSchedules: builder.query<{ workSchedules: WorkSchedule[] }, { companyId?: string } | void>({
      query: (params) => ({
        url: "/work-schedules",
        params: params || undefined,
      }),
      providesTags: ["WorkSchedule"],
    }),
    createWorkSchedule: builder.mutation<{ workSchedule: WorkSchedule }, CreateWorkSchedulePayload>({
      query: (body) => ({
        url: "/work-schedules",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WorkSchedule"],
    }),
    updateWorkSchedule: builder.mutation<{ workSchedule: WorkSchedule }, { id: string; body: Partial<CreateWorkSchedulePayload> & { active?: boolean } }>({
      query: ({ id, body }) => ({
        url: `/work-schedules/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["WorkSchedule"],
    }),
    deleteWorkSchedule: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/work-schedules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WorkSchedule"],
    }),
  }),
});

export const {
  useGetWorkSchedulesQuery,
  useCreateWorkScheduleMutation,
  useUpdateWorkScheduleMutation,
  useDeleteWorkScheduleMutation,
} = workScheduleApi;
