import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TimeOffPolicy {
  id: string;
  name: string;
  description?: string;
  accrualRate: number;
  maxBalance?: number;
  color: string;
}

export interface TimeOffRequest {
  id: string;
  userId: string;
  policyId: string;
  policy: TimeOffPolicy;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  attachment?: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface TimeOffBalance {
  id: string;
  userId: string;
  policyId: string;
  policy: TimeOffPolicy;
  balance: number;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
}

export const timeOffApi = createApi({
  reducerPath: "timeOffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["TimeOffRequest", "TimeOffBalance", "TimeOffPolicy", "Holiday"],
  endpoints: (builder) => ({
    getTimeOffRequests: builder.query<
      { timeOffRequests: TimeOffRequest[] },
      { userId?: string; companyId?: string; status?: string }
    >({
      query: (params) => ({
        url: "/time-off/requests",
        params,
      }),
      providesTags: ["TimeOffRequest"],
    }),
    createTimeOffRequest: builder.mutation<
      { timeOffRequest: TimeOffRequest },
      Partial<TimeOffRequest> & { companyId?: string }
    >({
      query: (body) => ({
        url: "/time-off/requests",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TimeOffRequest"],
    }),
    updateTimeOffRequest: builder.mutation<
      { timeOffRequest: TimeOffRequest },
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/time-off/requests/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["TimeOffRequest", "TimeOffBalance"],
    }),
    getTimeOffBalances: builder.query<
      { timeOffBalances: TimeOffBalance[] },
      { userId?: string; companyId?: string }
    >({
      query: (params) => ({
        url: "/time-off/balances",
        params,
      }),
      providesTags: ["TimeOffBalance"],
    }),
    getTimeOffPolicies: builder.query<{ timeOffPolicies: TimeOffPolicy[] }, string>({
      query: (companyId) => `/time-off/policies?companyId=${companyId}`,
      providesTags: ["TimeOffPolicy"],
    }),
    getHolidays: builder.query<{ holidays: Holiday[] }, string>({
      query: (companyId) => `/time-off/holidays?companyId=${companyId}`,
      providesTags: ["Holiday"],
    }),
    createHoliday: builder.mutation<{ holiday: Holiday }, Partial<Holiday> & { companyId?: string }>({
      query: (body) => ({
        url: "/time-off/holidays",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Holiday"],
    }),
    deleteHoliday: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/time-off/holidays/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Holiday"],
    }),
    deleteTimeOffRequest: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/time-off/requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TimeOffRequest", "TimeOffBalance"],
    }),
    createTimeOffPolicy: builder.mutation<
      { timeOffPolicy: TimeOffPolicy },
      Partial<TimeOffPolicy> & { companyId?: string }
    >({
      query: (body) => ({
        url: "/time-off/policies",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TimeOffPolicy"],
    }),
    deleteTimeOffPolicy: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/time-off/policies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TimeOffPolicy", "TimeOffRequest", "TimeOffBalance"],
    }),
  }),
});

export const {
  useGetTimeOffRequestsQuery,
  useCreateTimeOffRequestMutation,
  useUpdateTimeOffRequestMutation,
  useGetTimeOffBalancesQuery,
  useGetTimeOffPoliciesQuery,
  useGetHolidaysQuery,
  useCreateHolidayMutation,
  useDeleteHolidayMutation,
  useDeleteTimeOffRequestMutation,
  useCreateTimeOffPolicyMutation,
  useDeleteTimeOffPolicyMutation,
} = timeOffApi;

