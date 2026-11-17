"use client";

import Link from "next/link";
import { BookOpen, BookPlus, CalendarCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    tag: "Welcome to BookNook",
    title: "Every book deserves a second reader",
    text: "Browse what your neighbours have shared and borrow your next read for a whole week.",
    icon: BookOpen,
    blobA: "bg-primary",
    blobB: "bg-secondary/70",
    blobC: "bg-accent/80",
  },
  {
    tag: "Share your shelf",
    title: "Got a book gathering dust? Share it",
    text: "Add it to the library in a minute and let other readers enjoy it.",
    icon: BookPlus,
    blobA: "bg-secondary",
    blobB: "bg-primary/70",
    blobC: "bg-accent/80",
  },
  {
    tag: "Read at your pace",
    title: "Borrow for seven days, return in one click",
    text: "Keep a book for a week, then send it back so the next reader can pick it up.",
    icon: CalendarCheck,
    blobA: "bg-accent",
    blobB: "bg-secondary/70",
    blobC: "bg-primary/80",
  },
];

export default function HeroSlider() {
  return (
    <section className="overflow-hidden border-b border-base-300 bg-base-200/60">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {slides.map((s) => {
          const Icon = s.icon;
          return (
            <SwiperSlide key={s.title}>
              <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-16 pt-10 sm:px-6 md:min-h-[480px] md:grid-cols-2">
                <div className="space-y-5 text-center md:text-left">
                  <p className="text-sm font-medium uppercase tracking-widest text-secondary">
                    {s.tag}
                  </p>
                  <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mx-auto max-w-md text-lg text-base-content/80 md:mx-0">
                    {s.text}
                  </p>
                  <Link href="/books" className="btn btn-primary">
                    Browse Books
                  </Link>
                </div>

                <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80" aria-hidden="true">
                  <div
                    className={`absolute left-2 top-4 h-52 w-52 rounded-[58%_42%_63%_37%/45%_55%_45%_55%] md:h-64 md:w-64 ${s.blobA}`}
                  />
                  <div
                    className={`absolute bottom-0 right-0 h-40 w-40 rounded-[40%_60%_45%_55%/55%_40%_60%_45%] md:h-48 md:w-48 ${s.blobB}`}
                  />
                  <div
                    className={`absolute right-6 top-0 h-16 w-16 rounded-full md:h-20 md:w-20 ${s.blobC}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-24 w-24 items-center justify-center rounded-full bg-base-100 text-primary shadow-lg md:h-28 md:w-28">
                      <Icon size={44} />
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}