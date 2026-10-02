import { PageFrame } from "@/components/layout/PageFrame";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero/Hero";
import { About } from "@/components/sections/About/About";
import { Projects } from "@/components/sections/Projects/Projects";
import { Education } from "@/components/sections/Education/Education";
import { EducationStory } from "@/components/sections/EducationStory/EducationStory";
import { Toolchain } from "@/components/sections/Toolchain/Toolchain";
import AchievementsScroll from "@/components/sections/AchievementsScroll";
import Achievements from "@/components/sections/Achievements/Achievements";





export default function Home() {
  return (
    <PageFrame>
      <Navbar />

      <main>
          <Hero />
          <About />
          <Projects />
          <Education />
          <EducationStory />
          <Toolchain />
          <AchievementsScroll />
          <Achievements />
      </main>
    </PageFrame>
  );
}