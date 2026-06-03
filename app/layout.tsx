import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { DashboardWrapper } from "@/components/ui/dashboard-wrapper";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ReduxProvider } from "@/store/provider";
import { SocketProvider } from "@/store/socket-context";
import { Toaster } from "sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peoplely HR",
  description: "HR Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <SocketProvider>
            <DashboardWrapper>
              {children}
            </DashboardWrapper>
            <ProgressBar />
            <Toaster position="top-right" richColors />
          </SocketProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
