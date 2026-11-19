import type { Metadata } from "next";
import Link from "next/link";
import { BookX } from "lucide-react";

export const metadata: Metadata = { title: "BookNook | Page Not Found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <span className="flex h-24 w-24 items-center justify-center rounded-[58%_42%_63%_37%/45%_55%_45%_55%] bg-base-200 text-primary">
        <BookX size={40} />
      </span>
      <p className="mt-6 text-sm font-medium uppercase tracking-widest text-secondary">
        Error 404
      </p>
      <h1 className="mt-2 text-4xl font-semibold">This page is not on the shelf</h1>
      <p className="mt-3 text-base-content/70">
        The page you are looking for may have moved, or it never existed. Let us
        take you back to the library.
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}