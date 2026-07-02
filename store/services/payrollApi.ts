import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PayrollRecord {
  id: string;
  userId: string;
  name: string;
  email: string;
  fallback: string;
  department: string;
  jobTitle: string;
  baseSalary: string;
  bonus: string;
  deductions: string;
  netPay: string;
  period: string;
  status: "PAID" | "PENDING" | "PROCESSING" | "FAILED";
  employmentType: string;
  geofencing: string;
  jobDate: string;
  lastWorkingDate: string;
  bankInfo: {
    bankName: string;
    accountName: string;
    branch: string;
    accountNumber: string;
    swiftBic: string;
    iban: string;
  };
}

export interface PayrollSetting {
  id: string;
  companyId: string;
  currency: string;
  monthlySalaryBasisMethod: string;
  monthlySalaryBasisDays: string;
  payCycleName: string;
  payCycleDescription: string;
  payCycleRepeatValue: string;
  payCycleRepeatPeriod: string;
  payCycleCutOffDate: string;
  payCyclePersonInCharge: string;
  payCycleReviewDays: string;
  payCycleCriteria: string;
  compensationOvertimeRate: string;
  compensationTaxMethod: string;
  compensationBpjsEmployee: string;
  compensationBpjsEmployer: string;
}

export const payrollApi = createApi({
  reducerPath: "payrollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["PayrollRecord", "PayrollSetting"],
  endpoints: (builder) => ({
    getPayrollRecords: builder.query<
      { payrollRecords: PayrollRecord[] },
      { companyId?: string; search?: string; department?: string; status?: string }
    >({
      query: (params) => ({
        url: "/payroll",
        params,
      }),
      providesTags: ["PayrollRecord"],
    }),
    getPayrollRecordById: builder.query<{ payrollRecord: PayrollRecord }, string>({
      query: (id) => `/payroll/${id}`,
      providesTags: ["PayrollRecord"],
    }),
    updatePayrollRecord: builder.mutation<
      { payrollRecord: PayrollRecord },
      Partial<PayrollRecord> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/payroll/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["PayrollRecord"],
    }),
    deletePayrollRecord: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/payroll/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PayrollRecord"],
    }),
    getPayrollSettings: builder.query<{ payrollSetting: PayrollSetting }, string>({
      query: (companyId) => `/payroll/settings?companyId=${companyId}`,
      providesTags: ["PayrollSetting"],
    }),
    updatePayrollSettings: builder.mutation<
      { payrollSetting: PayrollSetting },
      Partial<PayrollSetting> & { companyId: string }
    >({
      query: (body) => ({
        url: "/payroll/settings",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["PayrollSetting"],
    }),
  }),
});

export const {
  useGetPayrollRecordsQuery,
  useGetPayrollRecordByIdQuery,
  useUpdatePayrollRecordMutation,
  useDeletePayrollRecordMutation,
  useGetPayrollSettingsQuery,
  useUpdatePayrollSettingsMutation,
} = payrollApi;
