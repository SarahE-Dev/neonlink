import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ClientLayout from "@/components/client-layout"; // New client component

export const metadata = {
  title: "NeonLink - Cyberpunk Messenger",
  description: "A futuristic cyberpunk messaging platform",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-black text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ClientLayout>{children}</ClientLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}