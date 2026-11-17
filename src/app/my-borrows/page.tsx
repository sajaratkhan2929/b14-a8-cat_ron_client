import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PrivateRoute from "@/components/PrivateRoute";
import MyBorrowsTable from "@/components/MyBorrowsTable";

export const metadata: Metadata = { title: "BookNook | My Borrows" };

export default function MyBorrowsPage() {
  return (
    <>
      <PageHeader title="My Borrows" subtitle="Books you are reading right now." />
      <PrivateRoute>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <MyBorrowsTable />
        </div>
      </PrivateRoute>
    </>
  );
}