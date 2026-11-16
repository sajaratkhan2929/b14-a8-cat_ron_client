"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { uploadImage } from "@/lib/imgbb";
import { CATEGORIES } from "@/lib/types";
import { useAuthUser } from "@/lib/useAuthUser";

const MAX_IMAGE_MB = 5;

export default function AddBookForm() {
  const router = useRouter();
  const { user } = useAuthUser();
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState("");

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

    if (!(file instanceof File) || file.size === 0) {
      toast.error("Please choose a book image");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("The file must be an image");
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      toast.error(`The image must be smaller than ${MAX_IMAGE_MB} MB`);
      return;
    }
    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be at least 1");
      return;
    }

    setSubmitting(true);
    try {
      const image = await uploadImage(file);
      await apiFetch("/books", {
        method: "POST",
        auth: true,
        body: { title, author, category, image, description, totalCopies },
      });
      toast.success("Book added to the library");
      router.push("/books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add the book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Book Title</span>
            <input name="title" type="text" required placeholder="The Hobbit" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Author Name</span>
            <input name="author" type="text" required placeholder="J.R.R. Tolkien" className="input input-bordered w-full" />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Category</span>
            <select name="category" defaultValue="Fiction" className="select select-bordered w-full">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Total Copies</span>
            <input name="totalCopies" type="number" min={1} step={1} defaultValue={1} required className="input input-bordered w-full" />
          </label>
        </div>

        <label className="form-control w-full">
          <span className="mb-1 block text-sm">Book Image</span>
          <input
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={handleFile}
            className="file-input file-input-bordered w-full"
          />
        </label>
        {preview && (
          <div className="w-40 overflow-hidden rounded-box border border-base-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Selected book cover" className="aspect-[3/4] w-full object-cover" />
          </div>
        )}

        <label className="form-control w-full">
          <span className="mb-1 block text-sm">Short Description</span>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="What is this book about?"
            className="textarea textarea-bordered w-full"
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="form-control w-full">
            <span className="mb-1 block text-sm">User Name</span>
            <input type="text" readOnly value={user?.name ?? ""} className="input input-bordered w-full opacity-80" />
          </label>
          <label className="form-control w-full">
            <span className="mb-1 block text-sm">User Email</span>
            <input type="email" readOnly value={user?.email ?? ""} className="input input-bordered w-full opacity-80" />
          </label>
        </div>

        <button type="submit" disabled={submitting} className="btn btn-primary w-full">
          {submitting ? (
            <>
              <span className="loading loading-spinner loading-sm" /> Adding...
            </>
          ) : (
            "Add Book"
          )}
        </button>
      </form>
    </div>
  );
}