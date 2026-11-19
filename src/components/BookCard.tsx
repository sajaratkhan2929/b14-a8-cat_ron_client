import Link from "next/link";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-200 transition-transform duration-200 hover:-translate-y-1">
      <div className="aspect-[3/4] w-full bg-base-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="badge badge-outline badge-sm w-fit">{book.category}</span>
        <h3 className="line-clamp-1 text-base font-semibold">{book.title}</h3>
        <p className="line-clamp-1 text-sm text-base-content/70">by {book.author}</p>
        <Link
          href={`/books/${book._id}`}
          className="btn btn-primary btn-sm mt-2"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}