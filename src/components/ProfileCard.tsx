"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useAuthUser } from "@/lib/useAuthUser";

export default function ProfileCard() {
  const { user } = useAuthUser();
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const fallback = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const image = String(form.get("image") || "").trim();

    if (!name) {
      toast.error("Your name cannot be empty");
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({
      name,
      ...(image ? { image } : {}),
    });
    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not update your profile");
      return;
    }
    toast.success("Profile updated");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="rounded-box border border-base-300 bg-base-200 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-28 w-28 overflow-hidden rounded-full ring-4 ring-primary/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              referrerPolicy="no-referrer"
              src={user.image || fallback}
              alt={user.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallback;
              }}
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-base-content/70">{user.email}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/my-books" className="btn btn-outline btn-sm">
              My Books
            </Link>
            <Link href="/my-borrows" className="btn btn-outline btn-sm">
              My Borrows
            </Link>
          </div>
        </div>

        <form
          key={`${user.name}-${user.image}`}
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 border-t border-base-300 pt-8"
        >
          <h3 className="text-xl font-semibold">Update your profile</h3>

          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Name</span>
            <input
              name="name"
              type="text"
              required
              defaultValue={user.name}
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Photo URL</span>
            <input
              name="image"
              type="url"
              defaultValue={user.image ?? ""}
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Email</span>
            <input
              type="email"
              readOnly
              value={user.email}
              className="input input-bordered w-full opacity-80"
            />
          </label>

          <button type="submit" disabled={saving} className="btn btn-primary w-full">
            {saving ? (
              <>
                <span className="loading loading-spinner loading-sm" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}