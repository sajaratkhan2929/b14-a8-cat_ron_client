"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/lib/types";
import BookCard from "./BookCard";
import Spinner from "./Spinner";

export default function BookList({ limit }: { limit?: number }) {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  const path = limit ? `/books?limit=${limit}` : "/books";

  useEffect(() => {
    let ignore = false;
    apiFetch<Book[]>(path)
      .then((data) => {
        if (!ignore) setBooks(data);
      })
      .catch((err) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Could not load books");
        }
      });
    return () => {
      ignore = true;
    };
  }, [path, attempt]);

  const retry = () => {
    setError("");
    setBooks(null);
    setAttempt((a) => a + 1);
  };

  if (error) {
    return (
      <div className="rounded-box border border-base-300 bg-base-200 p-10 text-center">
        <p className="text-error">{error}</p>
        <button onClick={retry} className="btn btn-primary btn-sm mt-4">
          Try again
        </button>
      </div>
    );
  }

  if (books === null) return <Spinner label="Loading books" />;

  if (books.length === 0) {
    return (
      <div className="rounded-box border border-base-300 bg-base-200 p-10 text-center">
        <h3 className="text-xl font-semibold">No books on the shelf yet</h3>
        <p className="mt-2 text-base-content/70">
          Be the first to add a book to the library.
        </p>
        <Link href="/add-book" className="btn btn-primary btn-sm mt-4">
          Add a Book
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}