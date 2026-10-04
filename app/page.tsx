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
import TopDesigns from "@/components/sections/TopDesigns/TopDesigns";
import Contact from "@/components/sections/Contact/Contact";





export default function Home() {
  return (
    <PageFrame>
      <Navbar />

      <main>
          <Hero />
          <About />
          <Projects />
          <Education />

          <div className="hide-on-mobile">
          <EducationStory />
          </div>

          <div className="hide-on-mobile">
          <Toolchain />
          </div>

          <div className="hide-on-mobile">
          <AchievementsScroll />
          </div>

          <div className="hide-on-mobile">
          <Achievements />
          </div>

          <div className="hide-on-mobile">
          <TopDesigns />
          </div>
          

          <Contact />
      </main>
    </PageFrame>
  );
}