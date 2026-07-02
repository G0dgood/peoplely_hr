import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeesApi } from "./services/employeesApi";
import { authApi } from "./services/authApi";
import { officeApi } from "./services/officeApi";
import { departmentApi } from "./services/departmentApi";
import { jobTitleApi } from "./services/jobTitleApi";
import { companyApi } from "./services/companyApi";
import { workScheduleApi } from "./services/workScheduleApi";
import { rolePermissionApi } from "./services/rolePermissionApi";
import { checklistTasksApi } from "./services/checklistTasksApi";
import { checklistTemplatesApi } from "./services/checklistTemplatesApi";
import { newsApi } from "./services/newsApi";
import { messageApi } from "./services/messageApi";
import { timeOffApi } from "./services/timeOffApi";
import { attendanceApi } from "./services/attendanceApi";
import { recruitmentApi } from "./services/recruitmentApi";
import { payrollApi } from "./services/payrollApi";
import { notificationApi } from "./services/notificationApi";
import { performanceApi } from "./services/performanceApi";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [officeApi.reducerPath]: officeApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [jobTitleApi.reducerPath]: jobTitleApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [workScheduleApi.reducerPath]: workScheduleApi.reducer,
    [rolePermissionApi.reducerPath]: rolePermissionApi.reducer,
    [checklistTasksApi.reducerPath]: checklistTasksApi.reducer,
    [checklistTemplatesApi.reducerPath]: checklistTemplatesApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [timeOffApi.reducerPath]: timeOffApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [recruitmentApi.reducerPath]: recruitmentApi.reducer,
    [payrollApi.reducerPath]: payrollApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [performanceApi.reducerPath]: performanceApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      employeesApi.middleware,
      authApi.middleware,
      officeApi.middleware,
      departmentApi.middleware,
      jobTitleApi.middleware,
      companyApi.middleware,
      workScheduleApi.middleware,
      rolePermissionApi.middleware,
      checklistTasksApi.middleware,
      checklistTemplatesApi.middleware,
      newsApi.middleware,
      messageApi.middleware,
      timeOffApi.middleware,
      attendanceApi.middleware,
      recruitmentApi.middleware,
      payrollApi.middleware,
      notificationApi.middleware,
      performanceApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
