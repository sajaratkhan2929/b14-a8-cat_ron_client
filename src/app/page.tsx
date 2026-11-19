import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import BookList from "@/components/BookList";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CategorySection from "@/components/CategorySection";
import HowItWorks from "@/components/HowItWorks";

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            title="New Arrivals"
            subtitle="The latest books added by our readers."
          />
          <BookList limit={6} />
          <div className="mt-10 text-center">
            <Link href="/books" className="btn btn-primary">
              See All Books
            </Link>
          </div>
        </Reveal>
      </section>

      <CategorySection />
      <HowItWorks />
    </>
  );
}