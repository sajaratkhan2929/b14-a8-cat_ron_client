"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/lib/types";
import { useAuthUser } from "@/lib/useAuthUser";

type Props = {
  book: Book;
  open: boolean;
  onClose: () => void;
  onBorrowed: () => void;
};

export default function BorrowModal({ book, open, onClose, onBorrowed }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { user } = useAuthUser();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        auth: true,
        body: { bookId: book._id },
      });
      toast.success(`You borrowed "${book.title}" for 7 days`);
      onBorrowed();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not borrow the book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box">
        <form method="dialog">
          <button
            aria-label="Close"
            className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
          >
            <X size={16} />
          </button>
        </form>

        <h3 className="text-2xl font-semibold">Borrow &ldquo;{book.title}&rdquo;</h3>
        <p className="mt-1 text-sm text-base-content/70">
          You can keep this book for 7 days.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="form-control w-full">
            <span className="mb-1 block text-sm">User Name</span>
            <input
              type="text"
              readOnly
              value={user?.name ?? ""}
              className="input input-bordered w-full opacity-80"
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-1 block text-sm">User Email</span>
            <input
              type="email"
              readOnly
              value={user?.email ?? ""}
              className="input input-bordered w-full opacity-80"
            />
          </label>

          <div className="modal-action">
            <button type="submit" disabled={submitting} className="btn btn-primary">
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" /> Borrowing...
                </>
              ) : (
                "Confirm Borrow"
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close">close</button>
      </form>
    </dialog>
  );
}