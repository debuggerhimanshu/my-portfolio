
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Achievements.module.css";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { image: "/achievement-1.png", theme: "light" },
  { image: "/achievement-2.png", theme: "dark" },
  { image: "/achievement-3.png", theme: "light" },
  { image: "/achievement-4.png", theme: "dark" },
];

export default function Achievements() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(
        "[data-achievement-panel]",
        wrapper
      );

      panels.slice(0, -1).forEach((panel) => {
        const inner = panel.querySelector<HTMLElement>(
          "[data-achievement-inner]"
        );

        if (!inner) return;

        const getDifference = () =>
          Math.max(0, inner.scrollHeight - panel.clientHeight);

        const getRatio = () => {
          const difference = getDifference();
          return difference > 0
            ? difference / (difference + panel.clientHeight)
            : 0;
        };

        const updateSpacing = () => {
          const difference = getDifference();
          const ratio = getRatio();

          panel.style.marginBottom = ratio
            ? `${inner.scrollHeight * ratio}px`
            : "0px";
        };

        updateSpacing();

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () =>
              getRatio()
                ? `+=${inner.scrollHeight}`
                : "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        const ratio = getRatio();

        if (ratio > 0) {
          timeline.to(inner, {
            y: () => panel.clientHeight - inner.scrollHeight,
            duration: 1 / (1 - ratio) - 1,
            ease: "none",
          });
        }

        timeline
          .to(panel, {
            scale: 0.7,
            opacity: 0.5,
            duration: 0.9,
            ease: "none",
          })
          .to(panel, {
            opacity: 0,
            duration: 0.1,
            ease: "none",
          });
      });
    }, wrapper);

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("resize", refresh);

    const images = wrapper.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", refresh);
      }
    });

    refresh();

    return () => {
      window.removeEventListener("resize", refresh);
      images.forEach((img) => {
        img.removeEventListener("load", refresh);
      });
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper} id="achievements">
      {slides.map((slide, index) => (
        <section
          key={slide.image}
          className={`${styles.panel} ${
            slide.theme === "light" ? styles.light : styles.dark
          }`}
          data-achievement-panel
          aria-label={`Achievement ${index + 1}`}
        >
          <div className={styles.panelInner} data-achievement-inner>
            <img
              src={slide.image}
              alt={`Achievement ${index + 1}`}
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        </section>
      ))}
    </div>
  );
}
