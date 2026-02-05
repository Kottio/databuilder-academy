import {
  Navbar,
  Hero,
  UniqueValue,
  Architecture,
  Curriculum,
  Instructor,
  Pricing,
  FAQ,
  FinalCTA,
  Footer,
} from "@/app/components/landing";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <UniqueValue />
        <Architecture />
        <Curriculum />
        <Instructor />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
