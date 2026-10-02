
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TopDesigns.module.css";

gsap.registerPlugin(ScrollTrigger);

const designs = [
  { image: "/design-1.png", title: "Design 01" },
  { image: "/design-2.png", title: "Design 02" },
  { image: "/design-3.png", title: "Design 03" },
  { image: "/design-4.png", title: "Design 04" },
  { image: "/design-5.jpg", title: "Design 05" },
  { image: "/design-6.png", title: "Design 06" },
  { image: "/design-7.png", title: "Design 07" },
  { image: "/design-8.png", title: "Design 08" },
  { image: "/design-9.png", title: "Design 09" },
  { image: "/design-10.png", title: "Design 10" },
];

export default function TopDesigns() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const viewport = section.querySelector<HTMLElement>(
        "[data-gallery-viewport]"
      );
      const strip = section.querySelector<HTMLElement>(
        "[data-gallery-strip]"
      );

      if (!viewport || !strip) return;

      const getScrollDistance = () =>
        Math.max(0, strip.scrollWidth - viewport.clientWidth);

      gsap.to(strip, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: viewport,
          pin: viewport,
          start: "center center",
          end: () => `+=${getScrollDistance()}`,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();

    const images = Array.from(section.querySelectorAll("img"));

    window.addEventListener("resize", refresh);

    images.forEach((img) => {
      img.addEventListener("load", refresh);
      img.addEventListener("error", refresh);
    });

    // Wait until all images have loaded or failed before measuring.
    Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), {
            once: true,
          });
          img.addEventListener("error", () => resolve(), {
            once: true,
          });
        });
      })
    ).then(() => {
      if (section.isConnected) {
        ScrollTrigger.refresh();
      }
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", refresh);

      images.forEach((img) => {
        img.removeEventListener("load", refresh);
        img.removeEventListener("error", refresh);
      });

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top-designs"
      className={styles.section}
    >
      <div className={styles.heading}>
        <p className={styles.eyebrow}>... /Selected Works ...</p>

        <h2 className={styles.title}>
          Top <span>Designs.</span>
        </h2>

        <p className={styles.description}>
          A collection of visuals, experiments, and creative explorations.
        </p>
      </div>

      <div
        className={styles.galleryViewport}
        data-gallery-viewport
      >
        <div
          className={styles.galleryStrip}
          data-gallery-strip
        >
          {designs.map((design, index) => (
            <article
              className={styles.project}
              key={design.image}
            >
              <div className={styles.imageFrame}>
                <img
                  src={design.image}
                  alt={design.title}
                  draggable={false}
                  loading="eager"
                />
              </div>

              <div className={styles.projectInfo}>
                <span>{design.title}</span>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
