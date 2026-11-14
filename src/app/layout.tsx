import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "BookNook | Home",
  description: "A small online library. Add a book, borrow a book, return a book.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="booknook-dark" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${inter.variable} font-sans bg-base-100 text-base-content`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}