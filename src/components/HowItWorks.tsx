import { BookOpen, BookPlus, RotateCcw } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    icon: BookPlus,
    title: "Add a book",
    text: "Share a title from your shelf with its cover, author and number of copies.",
  },
  {
    icon: BookOpen,
    title: "Borrow for 7 days",
    text: "Pick any available book, confirm your details and keep it for a week.",
  },
  {
    icon: RotateCcw,
    title: "Return with one click",
    text: "Open My Borrows and return it so the next reader can enjoy it.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <Reveal>
        <div className="rounded-[2.5rem] bg-neutral px-6 py-14 text-neutral-content sm:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-neutral-content md:text-4xl">
              How Borrowing Works
            </h2>
            <p className="mt-2 text-neutral-content/80">
              Three simple steps from shelf to reader.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="flex flex-col items-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-content text-neutral">
                    <Icon size={28} />
                  </span>
                  <p className="mt-4 text-sm uppercase tracking-widest text-neutral-content/70">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-neutral-content/80">{s.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}