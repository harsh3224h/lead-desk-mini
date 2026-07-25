import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeadDesk — Transform Leads Into Revenue",
  description:
    "LeadDesk is a modern lead management platform that helps agencies capture, track, and convert business inquiries into revenue with real-time dashboards and intelligent lead workflows.",
  keywords: [
    "lead management",
    "CRM",
    "business leads",
    "sales pipeline",
    "agency",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} font-sans dark h-full antialiased`}
      >
        <body className={`${geistSans.className} min-h-full flex flex-col bg-background text-foreground antialiased`}>
          {children}
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
