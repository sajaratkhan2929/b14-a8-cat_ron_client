"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Borrow } from "@/lib/types";
import Spinner from "./Spinner";

export default function MyBorrowsTable() {
  const [borrows, setBorrows] = useState<Borrow[] | null>(null);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState("");

  useEffect(() => {
    let ignore = false;
    apiFetch<Borrow[]>("/borrows", { auth: true })
      .then((data) => {
        if (!ignore) setBorrows(data);
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : "Could not load your borrows");
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow._id);
    try {
      await apiFetch(`/borrows/${borrow._id}`, { method: "DELETE", auth: true });
      setBorrows((list) => (list ? list.filter((b) => b._id !== borrow._id) : list));
      toast.success(`You returned "${borrow.bookTitle}"`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not return the book");
    } finally {
      setReturningId("");
    }
  };

  if (error) {
    return (
      <div className="rounded-box border border-base-300 bg-base-200 p-10 text-center">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  if (borrows === null) return <Spinner label="Loading your borrows" />;

  if (borrows.length === 0) {
    return (
      <div className="rounded-box border border-base-300 bg-base-200 p-10 text-center">
        <h3 className="text-xl font-semibold">You have not borrowed any books</h3>
        <p className="mt-2 text-base-content/70">
          Pick something from the shelf and it will show up here.
        </p>
        <Link href="/books" className="btn btn-primary btn-sm mt-4">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-300 bg-base-200">
      <table className="table">
        <thead>
          <tr className="text-base-content/70">
            <th>Image</th>
            <th>Title</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((b) => (
            <tr key={b._id}>
              <td>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.bookImage}
                  alt={b.bookTitle}
                  className="h-16 w-12 rounded object-cover"
                />
              </td>
              <td className="font-semibold">
                <Link href={`/books/${b.bookId}`} className="hover:text-primary">
                  {b.bookTitle}
                </Link>
              </td>
              <td>{formatDate(b.borrowDate)}</td>
              <td>{formatDate(b.returnDate)}</td>
              <td className="text-right">
                <button
                  onClick={() => handleReturn(b)}
                  disabled={returningId === b._id}
                  className="btn btn-outline btn-primary btn-sm"
                >
                  {returningId === b._id ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    "Return Book"
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}