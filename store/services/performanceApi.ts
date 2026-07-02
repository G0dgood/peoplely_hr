import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PerformanceEvaluation {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  reviewerName: string;
  reviewPeriod: string;
  workQuality: number;
  communication: number;
  teamwork: number;
  punctuality: number;
  strengths: string;
  growth: string;
  status: "SUBMITTED" | "APPROVED";
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

export const performanceApi = createApi({
  reducerPath: "performanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["PerformanceEvaluation"],
  endpoints: (builder) => ({
    getPerformanceEvaluations: builder.query<
      { evaluations: PerformanceEvaluation[] },
      { companyId?: string; employeeId?: string; employeeEmail?: string } | void
    >({
      query: (params) => ({
        url: "/performance",
        params: params || undefined,
      }),
      providesTags: ["PerformanceEvaluation"],
    }),
    createPerformanceEvaluation: builder.mutation<
      { evaluation: PerformanceEvaluation },
      Partial<PerformanceEvaluation>
    >({
      query: (body) => ({
        url: "/performance",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PerformanceEvaluation"],
    }),
    updatePerformanceEvaluation: builder.mutation<
      { evaluation: PerformanceEvaluation },
      { id: string; body: Partial<PerformanceEvaluation> }
    >({
      query: ({ id, body }) => ({
        url: `/performance/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["PerformanceEvaluation"],
    }),
    deletePerformanceEvaluation: builder.mutation<
      { success: boolean },
      string
    >({
      query: (id) => ({
        url: `/performance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PerformanceEvaluation"],
    }),
  }),
});

export const {
  useGetPerformanceEvaluationsQuery,
  useCreatePerformanceEvaluationMutation,
  useUpdatePerformanceEvaluationMutation,
  useDeletePerformanceEvaluationMutation,
} = performanceApi;
