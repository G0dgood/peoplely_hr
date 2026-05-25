"use client";

import { Suspense } from "react";
import { AppProgressBar } from "next-nprogress-bar";

export function ProgressBar() {
  return (
    <Suspense fallback={null}>
      <AppProgressBar
        height="4px"
        color="#0FAF7A"
        options={{ showSpinner: false }}
        shallowRouting
        stopDelay={200}
      />
    </Suspense>
  );
}
