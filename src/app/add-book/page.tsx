import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PrivateRoute from "@/components/PrivateRoute";
import AddBookForm from "@/components/AddBookForm";

export const metadata: Metadata = { title: "BookNook | Add Book" };

export default function AddBookPage() {
  return (
    <>
      <PageHeader
        title="Add a Book"
        subtitle="Put a book from your shelf into the library."
      />
      <PrivateRoute>
        <AddBookForm />
      </PrivateRoute>
    </>
  );
}