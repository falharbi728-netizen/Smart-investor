import "./globals.css";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/components/AuthProvider";

const queryClient = new QueryClient();

export const metadata = {
  title: "Smart Investor | المستثمر الذكي",
  description:
    "منصة تربط المستثمرين بالفرص الاستثمارية في السعودية بما يتوافق مع رؤية 2030."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale: "ar" | "en" = "ar";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="min-h-screen bg-background text-foreground">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

