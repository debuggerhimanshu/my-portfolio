"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import styles from "./Projects.module.css";

gsap.registerPlugin(Flip);

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const projects: Project[] = [
  {
    id: "campusflow",
    title: "CampusFlow",
    description: "Event management platform",
    image: "/projects/campusflow.jpg",
  },
  {
    id: "deeptrust",
    title: "DeepTrust",
    description: "AI powered deepfake detection",
    image: "/projects/deeptrust.jpg",
  },
  {
    id: "ciphernote",
    title: "CipherNote",
    description: "Encrypted digital notebook",
    image: "/projects/ciphernote.jpg",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Creative developer portfolio",
    image: "/projects/portfolio.jpg",
  },
];

export function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<string | null>(null);

  /*
   * Current active layout.
   */
  const activeRef = useRef<string | null>(null);

  /*
   * Current GSAP Flip animation.
   */
  const flipRef = useRef<gsap.core.Timeline | null>(null);

  /*
   * Prevent hover changes while the layout is moving.
   */
  const isAnimatingRef = useRef(false);

  /*
   * Store the latest pointer position.
   *
   * We intentionally don't determine the card
   * underneath the cursor while the animation is running.
   */
  const pointerRef = useRef({
    x: 0,
    y: 0,
    insideGrid: false,
  });

  useLayoutEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>(
        "[data-project-card]"
      )
    );

    /*
     * =====================================================
     * LAYOUT CLASS HELPERS
     * =====================================================
     */

    const clearLayoutClasses = () => {
      grid.classList.remove(
        styles.activeCampusflow,
        styles.activeDeeptrust,
        styles.activeCiphernote,
        styles.activePortfolio
      );
    };

    const getLayoutClass = (id: string) => {
      switch (id) {
        case "campusflow":
          return styles.activeCampusflow;

        case "deeptrust":
          return styles.activeDeeptrust;

        case "ciphernote":
          return styles.activeCiphernote;

        case "portfolio":
          return styles.activePortfolio;

        default:
          return "";
      }
    };

    /*
     * =====================================================
     * POINTER / CARD DETECTION
     * =====================================================
     *
     * This function is ONLY called when the layout has
     * finished moving.
     *
     * That is important.
     */

    const getCardUnderPointer = () => {
      const { x, y, insideGrid } = pointerRef.current;

      if (!insideGrid) {
        return null;
      }

      const element = document.elementFromPoint(x, y);

      if (!(element instanceof HTMLElement)) {
        return null;
      }

      const card = element.closest<HTMLElement>(
        "[data-project-card]"
      );

      return card?.dataset.projectCard ?? null;
    };

    /*
     * =====================================================
     * CHECK WHERE POINTER ENDED UP
     * =====================================================
     */

    const resolvePointerState = () => {
      if (isAnimatingRef.current) {
        return;
      }

      const cardUnderPointer = getCardUnderPointer();

      /*
       * Cursor is over another project.
       */
      if (
        cardUnderPointer &&
        cardUnderPointer !== activeRef.current
      ) {
        activate(cardUnderPointer);
        return;
      }

      /*
       * Cursor is inside the grid but not over
       * any card.
       */
      if (!cardUnderPointer) {
        if (activeRef.current) {
          reset();
        }
      }
    };

    /*
     * =====================================================
     * ACTIVATE PROJECT
     * =====================================================
     */

    const activate = (id: string) => {
      if (!id) return;

      /*
       * Already active.
       */
      if (activeRef.current === id) {
        return;
      }

      /*
       * IMPORTANT:
       *
       * If Flip is currently moving the cards,
       * DON'T start another Flip.
       */
      if (isAnimatingRef.current) {
        return;
      }

      /*
       * Capture the CURRENT geometry.
       */
      const state = Flip.getState(cards);

      /*
       * Change the actual CSS grid layout.
       */
      clearLayoutClasses();

      const layoutClass = getLayoutClass(id);

      if (layoutClass) {
        grid.classList.add(layoutClass);
      }

      activeRef.current = id;
      isAnimatingRef.current = true;

      setActiveProject(id);

      /*
       * Animate from the previous geometry
       * to the new geometry.
       */
      flipRef.current = Flip.from(state, {
        targets: cards,

        duration: 0.9,

        ease: "power3.inOut",

        stagger: {
          amount: 0.04,
          from: "center",
        },

        nested: true,

        absolute: false,

        onComplete: () => {
          flipRef.current = null;

          isAnimatingRef.current = false;

          /*
           * IMPORTANT:
           *
           * The cards may have moved underneath
           * the cursor.
           *
           * We DON'T trust mouseenter/mouseleave.
           *
           * Instead, now that the layout is stable,
           * check the actual pointer location.
           */
          resolvePointerState();
        },
      });
    };

    /*
     * =====================================================
     * RESET TO DEFAULT BENTO
     * =====================================================
     */

    const reset = () => {
      if (!activeRef.current) {
        return;
      }

      /*
       * Never interrupt an active Flip.
       */
      if (isAnimatingRef.current) {
        return;
      }

      /*
       * Capture expanded geometry.
       */
      const state = Flip.getState(cards);

      /*
       * Return to original layout.
       */
      clearLayoutClasses();

      activeRef.current = null;
      isAnimatingRef.current = true;

      setActiveProject(null);

      /*
       * Animate back to default bento.
       */
      flipRef.current = Flip.from(state, {
        targets: cards,

        duration: 0.8,

        ease: "power3.inOut",

        stagger: {
          amount: 0.04,
          from: "center",
        },

        nested: true,

        absolute: false,

        onComplete: () => {
          flipRef.current = null;

          isAnimatingRef.current = false;

          /*
           * The cursor might have entered a card
           * while the reset animation was running.
           *
           * Resolve again from the final layout.
           */
          resolvePointerState();
        },
      });
    };

    /*
     * =====================================================
     * POINTER MOVE
     * =====================================================
     *
     * We listen on the GRID rather than individual cards.
     */

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;

      /*
       * While the layout is moving:
       *
       * DO NOT inspect the card under the pointer.
       *
       * Just remember the pointer position.
       */
      if (isAnimatingRef.current) {
        return;
      }

      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const card = target.closest<HTMLElement>(
        "[data-project-card]"
      );

      const id = card?.dataset.projectCard;

      if (id) {
        activate(id);
      }
    };

    /*
     * =====================================================
     * POINTER ENTER GRID
     * =====================================================
     */

    const handlePointerEnter = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
      pointerRef.current.insideGrid = true;

      /*
       * Don't interrupt an existing animation.
       */
      if (isAnimatingRef.current) {
        return;
      }

      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const card = target.closest<HTMLElement>(
        "[data-project-card]"
      );

      const id = card?.dataset.projectCard;

      if (id) {
        activate(id);
      }
    };

    /*
     * =====================================================
     * POINTER LEAVE GRID
     * =====================================================
     */

    const handlePointerLeave = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
      pointerRef.current.insideGrid = false;

      /*
       * If we're currently animating,
       * DON'T interrupt it.
       *
       * The animation will finish normally.
       */
      if (isAnimatingRef.current) {
        return;
      }

      reset();
    };

    /*
     * =====================================================
     * EVENTS
     * =====================================================
     */

    grid.addEventListener(
      "pointermove",
      handlePointerMove
    );

    grid.addEventListener(
      "pointerenter",
      handlePointerEnter
    );

    grid.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    /*
     * =====================================================
     * CLEANUP
     * =====================================================
     */

    return () => {
      grid.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      grid.removeEventListener(
        "pointerenter",
        handlePointerEnter
      );

      grid.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      flipRef.current?.kill();

      clearLayoutClasses();

      activeRef.current = null;

      isAnimatingRef.current = false;
    };
  }, []);

  return (
    <section
      id="projects"
      className={styles.projects}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>
            ... /Projects ...
          </span>

          <p className={styles.description}>
            A selection of things I&apos;ve built across
            development, design, AI, and creative
            technology.
          </p>
        </div>

        <h2 className={styles.title}>
          Projects
        </h2>
      </div>

      {/* =================================================
          PROJECT BENTO
      ================================================= */}

      <div
        ref={gridRef}
        className={styles.projectGrid}
      >
        {projects.map((project, index) => (
          <article
            key={project.id}
            data-project-card={project.id}
            className={`
              ${styles.projectCard}
              ${styles[`project${index + 1}`]}
              ${
                activeProject === project.id
                  ? styles.active
                  : ""
              }
            `}
            tabIndex={0}
          >
            <div className={styles.imageWrapper}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.projectImage}
              />

              <div className={styles.imageOverlay} />

              <div className={styles.projectInfo}>
                <div>
                  <span className={styles.projectNumber}>
                    0{index + 1}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>
                </div>

                <span className={styles.projectArrow}>
                  ↗
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* =================================================
          GITHUB
      ================================================= */}

      <div className={styles.githubWrapper}>
        <a
          href="https://github.com/debuggerhimanshu"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubButton}
        >
          <span>
            View GitHub
          </span>

          <span>
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}