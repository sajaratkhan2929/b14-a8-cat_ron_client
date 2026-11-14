export type AuthUser = {
  name: string;
  email: string;
  image?: string;
} | null;

// TEMPORARY: replaced with BetterAuth in the auth step.
// Set to true to preview the logged-in Navbar.
const PREVIEW_LOGGED_IN = false;

const previewUser: AuthUser = {
  name: "Rumman Shajarat",
  email: "rumman@example.com",
  image: "",
};

export function useAuthUser(): {
  user: AuthUser;
  loading: boolean;
  logout: () => void;
} {
  return {
    user: PREVIEW_LOGGED_IN ? previewUser : null,
    loading: false,
    logout: () => {},
  };
}