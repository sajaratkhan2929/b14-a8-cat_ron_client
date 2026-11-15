"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  // Only allow redirects inside this site.
  const redirect = searchParams.get("redirect");
  const redirectTo =
    redirect && redirect.startsWith("/") && !redirect.startsWith("//")
      ? redirect
      : "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    setFormError("");
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const message = error.message || "Could not log you in";
      setFormError(message);
      toast.error(message);
      return;
    }

    toast.success("Welcome back!");
    router.push(redirectTo);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="rounded-box border border-base-300 bg-base-200 p-8">
        <h1 className="text-center text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-base-content/70">
          Log in to borrow and manage your books.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-1 block text-sm">Password</span>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Your password"
                className="input input-bordered w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <div className="text-right">
            <button
              type="button"
              onClick={() => toast("Password reset is coming soon")}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {formError && <p className="text-sm text-error">{formError}</p>}

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content/70">
          New to BookNook?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}