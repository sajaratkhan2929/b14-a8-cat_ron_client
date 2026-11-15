"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getPasswordError } from "@/lib/validatePassword";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const image = String(form.get("image") || "").trim();
    const password = String(form.get("password") || "");

    setFormError("");
    const pwError = getPasswordError(password);
    setPasswordError(pwError);
    if (pwError) return;

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || undefined,
    });
    setLoading(false);

    if (error) {
      const message = error.message || "Could not create your account";
      setFormError(message);
      toast.error(message);
      return;
    }

    toast.success("Account created. Please log in.");
    router.push("/login");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="rounded-box border border-base-300 bg-base-200 p-8">
        <h1 className="text-center text-3xl font-semibold">Create your account</h1>
        <p className="mt-2 text-center text-sm text-base-content/70">
          Join BookNook to add, borrow and return books.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Name</span>
            <input
              name="name"
              type="text"
              required
              placeholder="Your full name"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Photo URL</span>
            <input
              name="image"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Password</span>
            <input
              name="password"
              type="password"
              required
              placeholder="Create a password"
              className="input input-bordered w-full"
            />
            {passwordError && (
              <span className="mt-1 block text-sm text-error">{passwordError}</span>
            )}
          </label>

          {formError && <p className="text-sm text-error">{formError}</p>}

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Register"}
          </button>
               </form>

        <div className="divider text-xs text-base-content/50">OR</div>
        <GoogleButton callbackURL="/" />

        <p className="mt-6 text-center text-sm text-base-content/70">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}