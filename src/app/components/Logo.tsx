import Link from "next/link";
import { BookMarked } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-content">
        <BookMarked size={18} />
      </span>
      <span className="font-heading text-2xl font-semibold tracking-tight">
        BookNook
      </span>
    </Link>
  );
}