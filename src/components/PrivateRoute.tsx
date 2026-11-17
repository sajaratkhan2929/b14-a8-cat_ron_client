"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/lib/useAuthUser";
import Spinner from "./Spinner";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      const current = window.location.pathname + window.location.search;
      router.replace(`/login?redirect=${encodeURIComponent(current)}`);
    }
  }, [loading, user, router]);

  if (loading || !user) return <Spinner />;
  return <>{children}</>;
}