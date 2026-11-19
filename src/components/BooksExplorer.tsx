"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/types";
import BookList from "./BookList";

export default function BooksExplorer() {
  const params = useSearchParams();
  const raw = params.get("category");
  const category = CATEGORIES.find((c) => c === raw);

  const chip = (active: boolean) =>
    `btn btn-sm ${active ? "btn-primary" : "btn-outline"}`;

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <Link href="/books" className={chip(!category)}>
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link key={c} href={`/books?category=${c}`} className={chip(category === c)}>
            {c}
          </Link>
        ))}
      </div>
      <BookList category={category} />
    </>
  );
}