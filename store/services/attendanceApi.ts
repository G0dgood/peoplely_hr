import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  clockIn: string;
  clockInLoc: string;
  clockOut: string | null;
  clockOutLoc: string | null;
  schedule: string;
  logged: string;
  paid: string;
  overtime: string;
  status: "PENDING" | "APPROVED";
  isPositive: boolean;
  notes: string | null;
  device: string;
  ipAddress: string | null;
  companyId: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AttendanceSetting {
  id: string;
  companyId: string;
  totalHoursCalculation: string;
  startDate: string;
  approvalCycleValue: string;
  approvalCyclePeriod: string;
  repeatOn: string;
  location: string;
  officeName: string;
  officeChannels: string;
  officeQrCode: string;
  officeGeofencing: string;
  officeAddress: string;
  officeRadius: string;
  officePolicy: string;
  qrAutoGenerateValue: string;
  qrAutoGeneratePeriod: string;
  qrSecurityType: string;
}

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["AttendanceRecord", "AttendanceSetting"],
  endpoints: (builder) => ({
    getAttendanceRecords: builder.query<
      { attendanceRecords: AttendanceRecord[] },
      { userId?: string; companyId?: string; search?: string; status?: string; recordType?: string; location?: string; dateRange?: string }
    >({
      query: (params) => ({
        url: "/attendance",
        params,
      }),
      providesTags: ["AttendanceRecord"],
    }),
    clockIn: builder.mutation<
      { attendanceRecord: AttendanceRecord },
      { userId: string; clockInLoc?: string; notes?: string; device?: string; ipAddress?: string; companyId?: string }
    >({
      query: (body) => ({
        url: "/attendance/clock-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AttendanceRecord"],
    }),
    clockOut: builder.mutation<
      { attendanceRecord: AttendanceRecord },
      { id: string; clockOutLoc?: string; notes?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/attendance/clock-out/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AttendanceRecord"],
    }),
    updateAttendanceRecord: builder.mutation<
      { attendanceRecord: AttendanceRecord },
      { id: string; paid?: string; status?: string; notes?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/attendance/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AttendanceRecord"],
    }),
    getAttendanceSettings: builder.query<{ attendanceSetting: AttendanceSetting }, string>({
      query: (companyId) => `/attendance/settings?companyId=${companyId}`,
      providesTags: ["AttendanceSetting"],
    }),
    updateAttendanceSettings: builder.mutation<
      { attendanceSetting: AttendanceSetting },
      Partial<AttendanceSetting> & { companyId: string }
    >({
      query: (body) => ({
        url: "/attendance/settings",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AttendanceSetting"],
    }),
  }),
});

export const {
  useGetAttendanceRecordsQuery,
  useClockInMutation,
  useClockOutMutation,
  useUpdateAttendanceRecordMutation,
  useGetAttendanceSettingsQuery,
  useUpdateAttendanceSettingsMutation,
} = attendanceApi;
