import { PageFrame } from "@/components/layout/PageFrame";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero/Hero";
import { About } from "@/components/sections/About/About";

export default function Home() {
  return (
    <PageFrame>
      <Navbar />

      <main>
          <Hero />
          <About />
      </main>
    </PageFrame>
  );
}