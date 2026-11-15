"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuthUser } from "@/lib/useAuthUser";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuthUser();

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `rounded-lg px-3 py-2 text-sm transition-colors ${
      isActive(href)
        ? "text-primary font-medium"
        : "text-base-content/70 hover:text-base-content"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {loading ? (
              <div className="skeleton h-9 w-24 rounded-lg" />
              ) : !user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar cursor-pointer"
                aria-label="Open user menu"
              >
                <div className="h-9 w-9 rounded-full ring-2 ring-primary/50">
                 
                  {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                 referrerPolicy="no-referrer"
                 src={
                 user.image ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}`
              }
               alt={user.name}
               onError={(e) => {
                 e.currentTarget.onerror = null;
                 e.currentTarget.src = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}`;
                  }}
                 />

                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-200 p-2 shadow-lg"
              >
                <li className="pointer-events-none px-3 py-2">
                  <span className="font-heading text-base font-semibold">
                    {user.name}
                  </span>
                </li>
                <li>
                  <Link href="/profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={logout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-300 bg-base-200 p-2 shadow-lg"
            >
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              {!user && (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}