"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/lib/types";
import { useAuthUser } from "@/lib/useAuthUser";
import ConfirmModal from "./ConfirmModal";
import EditBookModal from "./EditBookModal";
import Spinner from "./Spinner";

export default function MyBooksTable() {
  const { user } = useAuthUser();
  const email = user?.email;

  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Book | null>(null);
  const [toDelete, setToDelete] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!email) return;
    let ignore = false;
    apiFetch<Book[]>(`/books?addedBy=${encodeURIComponent(email)}`)
      .then((data) => {
        if (!ignore) setBooks(data);
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : "Could not load your books");
      });
    return () => {
      ignore = true;
    };
  }, [email]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await apiFetch(`/books/${toDelete._id}`, { method: "DELETE", auth: true });
      setBooks((list) => (list ? list.filter((b) => b._id !== toDelete._id) : list));
      toast.success(`"${toDelete.title}" was deleted`);
      setToDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the book");
    } finally {
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="rounded-box border border-base-300 bg-base-200 p-10 text-center">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  if (books === null) return <Spinner label="Loading your books" />;

  if (books.length === 0) {
    return (
      <div className="rounded-box border border-base-300 bg-base-200 p-10 text-center">
        <h3 className="text-xl font-semibold">You have not added any books</h3>
        <p className="mt-2 text-base-content/70">
          Put a book from your shelf into the library.
        </p>
        <Link href="/add-book" className="btn btn-primary btn-sm mt-4">
          Add a Book
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-300 bg-base-200">
        <table className="table">
          <thead>
            <tr className="text-base-content/70">
              <th>Book</th>
              <th>Category</th>
              <th>Copies</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b._id}>
                <td>
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.image} alt={b.title} className="h-16 w-12 rounded object-cover" />
                    <div>
                      <Link href={`/books/${b._id}`} className="font-semibold hover:text-primary">
                        {b.title}
                      </Link>
                      <p className="text-sm text-base-content/70">{b.author}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-outline badge-sm">{b.category}</span>
                </td>
                <td>
                  {b.availableCopies} of {b.totalCopies}
                </td>
                <td>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing(b)} className="btn btn-outline btn-sm">
                      Edit
                    </button>
                    <button onClick={() => setToDelete(b)} className="btn btn-outline btn-error btn-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditBookModal
          key={editing._id}
          book={editing}
          onClose={() => setEditing(null)}
          onSaved={(updated) =>
            setBooks((list) => (list ? list.map((b) => (b._id === updated._id ? updated : b)) : list))
          }
        />
      )}

      <ConfirmModal
        open={toDelete !== null}
        title="Delete this book?"
        message={`"${toDelete?.title ?? ""}" will be removed from the library. This cannot be undone.`}
        confirmLabel="Delete"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}