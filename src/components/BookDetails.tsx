"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/lib/types";
import BorrowModal from "./BorrowModal";
import Spinner from "./Spinner";

type Borrow = { _id: string; bookId: string };

export default function BookDetails({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [alreadyBorrowed, setAlreadyBorrowed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const [bookData, borrows] = await Promise.all([
          apiFetch<Book>(`/books/${id}`),
          apiFetch<Borrow[]>("/borrows", { auth: true }),
        ]);
        if (ignore) return;
        setBook(bookData);
        setAlreadyBorrowed(borrows.some((b) => b.bookId === id));
      } catch (err) {
        if (ignore) return;
        const message = err instanceof Error ? err.message : "Could not load the book";
        if (message === "Book not found" || message === "Invalid book id") {
          setNotFound(true);
        } else {
          setError(message);
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  const backLink = (
    <Link href="/books" className="btn btn-outline btn-sm gap-2">
      <ArrowLeft size={16} /> Back to all books
    </Link>
  );

  if (notFound) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold">This book is not on the shelf</h1>
        <p className="mt-2 text-base-content/70">
          It may have been removed by the person who added it.
        </p>
        <div className="mt-6">{backLink}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-error">{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary btn-sm mt-4">
          Try again
        </button>
      </div>
    );
  }

  if (!book) return <Spinner label="Loading book" />;

  const soldOut = book.availableCopies <= 0;

  let action: React.ReactNode;
  if (alreadyBorrowed) {
    action = (
      <button disabled className="btn btn-primary">
        Already Borrowed
      </button>
    );
  } else if (soldOut) {
    action = (
      <button disabled className="btn btn-primary">
        Not Available
      </button>
    );
  } else {
    action = (
      <button onClick={() => setModalOpen(true)} className="btn btn-primary">
        Borrow This Book
      </button>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="overflow-hidden rounded-box border border-base-300 bg-base-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.image}
            alt={book.title}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="badge badge-outline w-fit">{book.category}</span>
          <h1 className="text-4xl font-semibold">{book.title}</h1>
          <p className="text-lg text-base-content/70">by {book.author}</p>
          <p className="leading-relaxed">{book.description}</p>

          <div className="grid gap-4 rounded-box border border-base-300 bg-base-200 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-base-content/60">Added by</p>
              <p className="font-semibold">{book.addedBy.name}</p>
              <p className="break-all text-sm text-base-content/70">{book.addedBy.email}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Copies left</p>
              <p className="font-semibold">
                {book.availableCopies} of {book.totalCopies}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {action}
            {backLink}
          </div>
        </div>
      </div>

      <BorrowModal
        book={book}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onBorrowed={() => {
          setBook({ ...book, availableCopies: book.availableCopies - 1 });
          setAlreadyBorrowed(true);
        }}
      />
    </div>
  );
}