"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import styles from "./EducationStory.module.css";

const storyText =
  "I write code to build ideas, and I create visuals to give them a voice, blending technology and art to turn imagination into something real.";

const words = storyText.split(" ");

function HighlightWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const color = useTransform(
    progress,
    [start, end],
    ["#555555", "#f2f2f2"]
  );

  return (
    <motion.span
      style={{ color }}
      className={styles.word}
    >
      {word}
    </motion.span>
  );
}

export function EducationStory() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* --------------------------------
     Image 1
  -------------------------------- */

  const image1X = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["0%", "130%"]
  );

  /* --------------------------------
     Image 2
  -------------------------------- */

  const image2X = useTransform(
    scrollYProgress,
    [0.25, 0.50],
    ["0%", "130%"]
  );

  /* --------------------------------
     Image 3
  -------------------------------- */

  const image3X = useTransform(
    scrollYProgress,
    [0.50, 0.75],
    ["0%", "130%"]
  );

  /* --------------------------------
     Image 4
     Final image — stays in frame
  -------------------------------- */

  const image4X = useTransform(
    scrollYProgress,
    [0.75, 1],
    ["0%", "0%"]
  );

  return (
    <section
      ref={sectionRef}
      className={styles.story}
    >
      <div className={styles.stickyStage}>

        <div className={styles.content}>

          {/* --------------------------------
              Story Text
          -------------------------------- */}

          <div className={styles.textWrapper}>
            <p className={styles.storyText}>
              {words.map((word, index) => (
                <span key={`${word}-${index}`}>
                  <HighlightWord
                    word={word}
                    index={index}
                    total={words.length}
                    progress={scrollYProgress}
                  />

                  {index < words.length - 1 && " "}
                </span>
              ))}
            </p>
          </div>

          {/* --------------------------------
              Image Stack
          -------------------------------- */}

          <div className={styles.imageFrame}>

            {/* Image 1 */}
            <motion.div
              className={styles.imageCard}
              style={{
                x: image1X,
                zIndex: 4,
              }}
            >
              <img
                src="/projects/school-1.jpg"
                alt="Development"
              />
            </motion.div>

            {/* Image 2 */}
            <motion.div
              className={styles.imageCard}
              style={{
                x: image2X,
                zIndex: 3,
              }}
            >
              <img
                src="/projects/school-2.jpg"
                alt="Creative design"
              />
            </motion.div>

            {/* Image 3 */}
            <motion.div
              className={styles.imageCard}
              style={{
                x: image3X,
                zIndex: 2,
              }}
            >
              <img
                src="/projects/school-3.jpg"
                alt="Technology and AI"
              />
            </motion.div>

            {/* Image 4 — final image */}
            <motion.div
              className={styles.imageCard}
              style={{
                x: image4X,
                zIndex: 1,
              }}
            >
              <img
                src="/projects/school-4.jpg"
                alt="Project"
              />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}