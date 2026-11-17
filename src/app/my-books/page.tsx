import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PrivateRoute from "@/components/PrivateRoute";
import MyBooksTable from "@/components/MyBooksTable";

export const metadata: Metadata = { title: "BookNook | My Books" };

export default function MyBooksPage() {
  return (
    <>
      <PageHeader title="My Books" subtitle="Books you added to the library." />
      <PrivateRoute>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <MyBooksTable />
        </div>
      </PrivateRoute>
    </>
  );
}