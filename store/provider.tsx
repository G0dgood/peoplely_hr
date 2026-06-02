"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { AuthPersistence } from "@/components/ui/auth-persistence";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthPersistence>{children}</AuthPersistence>
    </Provider>
  );
}
