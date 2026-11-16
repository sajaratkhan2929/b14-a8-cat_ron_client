import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BookList from "@/components/BookList";

export const metadata: Metadata = { title: "BookNook | All Books" };

export default function BooksPage() {
  return (
    <>
      <PageHeader
        title="All Books"
        subtitle="Everything on the shelf, ready to borrow."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <BookList />
      </div>
    </>
  );
}