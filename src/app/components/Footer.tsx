import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

const iconClass = "h-4 w-4 fill-current";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

const socials = [
  { label: "X", href: "https://x.com", icon: <XIcon /> },
  { label: "Facebook", href: "https://facebook.com", icon: <FacebookIcon /> },
  { label: "Instagram", href: "https://instagram.com", icon: <InstagramIcon /> },
];

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-base-content/70">
            A small neighbourhood library on the web. Share the books on your
            shelf and borrow the ones you have been meaning to read.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-base-content/70">
            <li className="flex items-center gap-3">
              <Mail size={16} /> hello@booknook.app
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} /> +880 1700 000 000
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} /> Merul Badda, Dhaka
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Follow us</h3>
          <div className="flex gap-3">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-base-300 text-base-content/80 transition-colors hover:border-primary hover:text-primary"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 py-4 text-center text-sm text-base-content/60">
        © {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}