import { PageFrame } from "@/components/layout/PageFrame";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero/Hero";

export default function Home() {
  return (
    <PageFrame>
      <Navbar />

      <main>
          <Hero />
      </main>
    </PageFrame>
  );
}