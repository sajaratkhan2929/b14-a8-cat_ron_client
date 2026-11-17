"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "./auth-client";

export type AuthUser = {
  name: string;
  email: string;
  image?: string;
} | null;

export function useAuthUser() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const user: AuthUser = data?.user
    ? {
        name: data.user.name,
        email: data.user.email,
        image: data.user.image ?? "",
      }
    : null;

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("You have been logged out");
          router.push("/");
        },
      },
    });
  };

  return { user, loading: isPending, logout };
}