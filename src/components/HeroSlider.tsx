"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    image: "/images/image1.jpg",
    tag: "Welcome to BookNook",
    title: "Every book deserves a second reader",
    text: "Browse what your neighbours have shared and borrow your next read for a whole week.",
  },
  {
    image: "/images/image2.jpg",
    tag: "Share your shelf",
    title: "Got a book gathering dust? Share it",
    text: "Add it to the library in a minute and let other readers enjoy it.",
  },
  {
    image: "/images/image3.jpg",
    tag: "Read at your pace",
    title: "Borrow for seven days, return in one click",
    text: "Keep a book for a week, then send it back so the next reader can pick it up.",
  },
];

export default function HeroSlider() {
  return (
    <section className="overflow-hidden border-b border-base-300">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.title}>
            <div className="relative min-h-[440px] md:min-h-[580px]">
              <Image
                src={s.image}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
              {/* Dark layer so the text is easy to read on every photo */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

              <div className="relative z-10 mx-auto flex min-h-[440px] max-w-7xl items-center px-4 pb-14 sm:px-6 md:min-h-[580px]">
                <div className="max-w-xl space-y-5 text-center md:text-left">
                  <p className="text-sm font-medium uppercase tracking-widest text-white/80">
                    {s.tag}
                  </p>
                  <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                    {s.title}
                  </h2>
                  <p className="text-lg text-white/85">{s.text}</p>
                  <Link href="/books" className="btn btn-primary">
                    Browse Books
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}