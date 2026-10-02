
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./AchievementsScroll.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Particle = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  img: HTMLImageElement;
};

export default function AchievementsScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const canvas = canvasRef.current;

    if (!section || !text || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx = context;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let radius = 0;
    let resizeObserver: ResizeObserver | undefined;
    let isDisposed = false;

    const particles: Particle[] = Array.from({ length: 99 }, (_, i) => {
      const img = new Image();
      img.src = `https://assets.codepen.io/16327/flair-${2 + (i % 21)}.png`;

      return {
        x: 0,
        y: 0,
        scale: 0,
        rotate: 0,
        img,
      };
    });

    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasWidth = rect.width;
      canvasHeight = rect.height;

      canvas.width = Math.round(canvasWidth * dpr);
      canvas.height = Math.round(canvasHeight * dpr);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.max(canvasWidth, canvasHeight);
    };

    const draw = () => {
      if (isDisposed) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const sortedParticles = [...particles].sort(
        (a, b) => a.scale - b.scale
      );

      sortedParticles.forEach((particle) => {
        const img = particle.img;

        if (!img.complete || !img.naturalWidth || particle.scale <= 0) {
          return;
        }

        const width = img.naturalWidth * particle.scale;
        const height = img.naturalHeight * particle.scale;

        ctx.save();
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate(particle.rotate);

        ctx.drawImage(
          img,
          particle.x - width / 2,
          particle.y - height / 2,
          width,
          height
        );

        ctx.restore();
      });
    };

    const handleImageLoad = () => draw();

    const ctxGSAP = gsap.context(() => {
      resizeCanvas();

      const split = SplitText.create(text, {
        type: "chars, words",
        charsClass: styles.char,
        wordsClass: styles.word,
      });

      // Horizontal scrolling text.
      const getTravelDistance = () => {
        const textWidth = text.scrollWidth;
        const viewportWidth = section.clientWidth;

        // Move the complete text off the left edge.
        return textWidth;
        };

        const scrollTween = gsap.to(text, {
        x: () => -getTravelDistance(),
        ease: "none",
        scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            start: "top top",
            end: () => `+=${getTravelDistance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
        },
        });

      // Character-by-character scroll animation.
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

      // Continuously animated particle background.
      const particleTimeline = gsap.timeline({
        repeat: -1,
        onUpdate: draw,
      });

      particleTimeline.fromTo(
        particles,
        {
          x: (i) => {
            const angle =
              (i / particles.length) * Math.PI * 2 - Math.PI / 2;

            return Math.cos(angle * 10) * radius;
          },
          y: (i) => {
            const angle =
              (i / particles.length) * Math.PI * 2 - Math.PI / 2;

            return Math.sin(angle * 10) * radius;
          },
          scale: 1.1,
          rotate: 0,
        },
        {
          duration: 5,
          ease: "sine.inOut",
          x: 0,
          y: 0,
          scale: 0,
          rotate: -3,
          stagger: {
            each: -0.05,
          },
        }
      );

      // Begin near the end of the staggered sequence.
      particleTimeline.seek(4.9);

      const handleResize = () => {
        resizeCanvas();
        particleTimeline.invalidate();
        ScrollTrigger.refresh();
        draw();
      };

      window.addEventListener("resize", handleResize);

      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(section);

      particles.forEach(({ img }) => {
        img.addEventListener("load", handleImageLoad);
      });

      draw();

      return () => {
        isDisposed = true;

        window.removeEventListener("resize", handleResize);
        resizeObserver?.disconnect();

        particles.forEach(({ img }) => {
          img.removeEventListener("load", handleImageLoad);
        });

        particleTimeline.kill();
        split.revert();
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      };
    }, section);

    return () => {
      isDisposed = true;
      resizeObserver?.disconnect();
      ctxGSAP.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.horizontal}
      aria-label="Achievements introduction"
    >
      <canvas
        ref={canvasRef}
        className={styles.particleCanvas}
        aria-hidden="true"
      />

      <div className={styles.container}>
        <p ref={textRef} className={styles.horizontalText}>
          Now, let&apos;s explore the projects and milestones that have shaped my journey, setting the stage for what&apos;s next.
        </p>
      </div>
    </section>
  );
}
