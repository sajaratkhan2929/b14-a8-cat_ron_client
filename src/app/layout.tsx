import type { Metadata } from "next";
import { Suspense } from "react";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "BookNook | Home",
  description: "A small online library. Add a book, borrow a book, return a book.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="booknook-light" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} font-sans bg-base-100 text-base-content`}
      >
        <div className="flex min-h-screen flex-col">
          <Suspense
            fallback={<div className="h-16 border-b border-base-300 bg-base-100" />}
          >
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}