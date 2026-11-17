import type { Metadata } from "next";
import PrivateRoute from "@/components/PrivateRoute";
import BookDetails from "@/components/BookDetails";

export const metadata: Metadata = { title: "BookNook | Book Details" };

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PrivateRoute>
      <BookDetails id={id} />
    </PrivateRoute>
  );
}