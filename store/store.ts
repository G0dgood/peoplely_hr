import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeesApi } from "./services/employeesApi";
import { authApi } from "./services/authApi";
import { officeApi } from "./services/officeApi";
import { departmentApi } from "./services/departmentApi";
import { jobTitleApi } from "./services/jobTitleApi";
import { companyApi } from "./services/companyApi";
import { workScheduleApi } from "./services/workScheduleApi";
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
      workScheduleApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
