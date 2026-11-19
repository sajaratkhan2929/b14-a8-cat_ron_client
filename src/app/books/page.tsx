import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import BooksExplorer from "@/components/BooksExplorer";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = { title: "BookNook | All Books" };

export default function BooksPage() {
  return (
    <>
      <PageHeader
        title="All Books"
        subtitle="Everything on the shelf, ready to borrow."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Suspense fallback={<Spinner label="Loading books" />}>
          <BooksExplorer />
        </Suspense>
      </div>
    </>
  );
}