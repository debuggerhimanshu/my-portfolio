
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./CursorTrail.module.css";

const trailImages = [
  "/design-1.png",
  "/design-2.png",
  "/design-3.png",
  "/design-4.png",
  "/design-5.jpg",
  "/design-6.png",
  "/design-7.png",
  "/design-8.png",
  "/design-9.png",
  "/design-10.png",
];

const GAP = 90;

export default function CursorTrail() {
  const layerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    // Avoid interfering with touch-based scrolling.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLImageElement>(
        "[data-trail-image]",
        layer
      );

      if (!images.length) return;

      let index = 0;
      let mouseX = 0;
      let mouseY = 0;
      let lastX = 0;
      let lastY = 0;
      let hasPointer = false;

      const onPointerMove = (event: PointerEvent) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        hasPointer = true;
      };

      const animateImage = () => {
        const image = images[index % images.length];

        // Stop the previous animation before reusing this image.
        gsap.killTweensOf(image);

        gsap.set(image, {
          x: mouseX,
          y: mouseY,
          xPercent: -50,
          yPercent: -50,
          rotation: 0,
          scale: 0,
          autoAlpha: 1,
        });

        gsap.timeline({
          onComplete: () => {
            gsap.set(image, { autoAlpha: 0 });
          },
        })
          .to(image, {
            scale: 1,
            duration: 0.35,
            ease: "elastic.out(1, 0.4)",
          })
          .to(
            image,
            {
              rotation: gsap.utils.random(-35, 35),
              duration: 0.3,
              ease: "power2.out",
            },
            "<"
          )
          .to(
            image,
            {
              y: window.innerHeight + 180,
              rotation: gsap.utils.random(-180, 180),
              scale: 0.7,
              autoAlpha: 0,
              duration: 1.2,
              ease: "power2.in",
            },
            0.15
          );

        index++;
      };

      const imageTrail = () => {
        if (!hasPointer) return;

        const distance = Math.hypot(
          mouseX - lastX,
          mouseY - lastY
        );

        if (distance < GAP) return;

        animateImage();

        lastX = mouseX;
        lastY = mouseY;
      };

      window.addEventListener("pointermove", onPointerMove);
      gsap.ticker.add(imageTrail);

      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        gsap.ticker.remove(imageTrail);
      };
    }, layer);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={layerRef}
      className={styles.trailLayer}
      aria-hidden="true"
    >
      {trailImages.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          draggable={false}
          className={styles.trailImage}
          data-trail-image
        />
      ))}
    </div>
  );
}
