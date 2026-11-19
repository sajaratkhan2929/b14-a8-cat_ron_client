import Link from "next/link";
import {
  Baby,
  BookOpen,
  FlaskConical,
  Landmark,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const icons: Record<string, LucideIcon> = {
  Fiction: BookOpen,
  Science: FlaskConical,
  History: Landmark,
  Kids: Baby,
  Others: Sparkles,
};

const shapes = [
  "rounded-[58%_42%_63%_37%/45%_55%_45%_55%]",
  "rounded-[40%_60%_45%_55%/55%_40%_60%_45%]",
  "rounded-[50%_50%_40%_60%/60%_45%_55%_40%]",
  "rounded-[45%_55%_60%_40%/40%_60%_40%_60%]",
  "rounded-[60%_40%_50%_50%/50%_55%_45%_50%]",
];

export default function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          title="Browse by Category"
          subtitle="Pick a shelf and see what is waiting for you."
        />
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c, i) => {
            const Icon = icons[c];
            return (
              <Link
                key={c}
                href={`/books?category=${c}`}
                className="group flex flex-col items-center gap-3"
              >
                <span
                  className={`flex h-28 w-28 items-center justify-center bg-base-200 text-primary transition-transform duration-200 group-hover:scale-105 ${shapes[i % shapes.length]}`}
                >
                  <Icon size={38} />
                </span>
                <span className="font-medium group-hover:text-primary">{c}</span>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}