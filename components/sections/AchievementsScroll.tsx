
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./AchievementsScroll.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AchievementsScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(text, {
        type: "chars, words",
        charsClass: styles.char,
        wordsClass: styles.word,
      });

      // Measure the full horizontal distance after splitting the text.
      const getTravelDistance = () =>
        Math.max(0, text.scrollWidth - window.innerWidth);

      // Move the complete paragraph horizontally as the section is pinned.
      const scrollTween = gsap.to(text, {
        x: () => -getTravelDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${Math.max(
            getTravelDistance(),
            window.innerWidth
          )}`,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Animate each character as it enters and crosses the viewport.
      split.chars.forEach((char) => {
        gsap.from(char, {
          yPercent: () => gsap.utils.random(-150, 150),
          rotation: () => gsap.utils.random(-18, 18),
          opacity: 0.25,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 1,
          },
        });
      });

      // Recalculate positions after fonts and layout settle.
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        split.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.horizontal}
      aria-label="Achievements introduction"
    >
      <div className={styles.container}>
        <p ref={textRef} className={styles.horizontalText}>
          Now, let&apos;s explore the milestones, projects, and achievements
          that have shaped my journey so far each one a step forward in
          what I&apos;m building next.
        </p>
      </div>
    </section>
  );
}
