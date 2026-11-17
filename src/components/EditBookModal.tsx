"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { uploadImage } from "@/lib/imgbb";
import { CATEGORIES, type Book } from "@/lib/types";

const MAX_IMAGE_MB = 5;

type Props = {
  book: Book;
  onClose: () => void;
  onSaved: (book: Book) => void;
};

export default function EditBookModal({ book, onClose, onSaved }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const title = String(form.get("title") || "").trim();
    const author = String(form.get("author") || "").trim();
    const category = String(form.get("category") || "");
    const description = String(form.get("description") || "").trim();
    const totalCopies = Number(form.get("totalCopies"));
    const file = form.get("image");

    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be at least 1");
      return;
    }

    setSaving(true);
    try {
      let image = book.image;
      if (file instanceof File && file.size > 0) {
        if (!file.type.startsWith("image/")) throw new Error("The file must be an image");
        if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
          throw new Error(`The image must be smaller than ${MAX_IMAGE_MB} MB`);
        }
        image = await uploadImage(file);
      }

      const updated = await apiFetch<Book>(`/books/${book._id}`, {
        method: "PATCH",
        auth: true,
        body: { title, author, category, description, totalCopies, image },
      });
      toast.success("Book updated");
      onSaved(updated);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the book");
    } finally {
      setSaving(false);
    }
  };

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box max-w-2xl">
        <form method="dialog">
          <button
            aria-label="Close"
            className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
          >
            <X size={16} />
          </button>
        </form>

        <h3 className="text-2xl font-semibold">Edit book</h3>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="form-control w-full">
              <span className="mb-1 block text-sm">Book Title</span>
              <input name="title" type="text" required defaultValue={book.title} className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <span className="mb-1 block text-sm">Author Name</span>
              <input name="author" type="text" required defaultValue={book.author} className="input input-bordered w-full" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="form-control w-full">
              <span className="mb-1 block text-sm">Category</span>
              <select name="category" defaultValue={book.category} className="select select-bordered w-full">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="form-control w-full">
              <span className="mb-1 block text-sm">Total Copies</span>
              <input name="totalCopies" type="number" min={1} step={1} required defaultValue={book.totalCopies} className="input input-bordered w-full" />
            </label>
          </div>

          <div className="flex items-end gap-4">
            <div className="h-24 w-[4.5rem] shrink-0 overflow-hidden rounded border border-base-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview || book.image} alt="Book cover" className="h-full w-full object-cover" />
            </div>
            <label className="form-control w-full">
              <span className="mb-1 block text-sm">Change Image (optional)</span>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="file-input file-input-bordered w-full"
              />
            </label>
          </div>

          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Short Description</span>
            <textarea name="description" required rows={4} defaultValue={book.description} className="textarea textarea-bordered w-full" />
          </label>

          <div className="modal-action">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-sm" /> Saving...
                </>
              ) : (
                "Save Changes"
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