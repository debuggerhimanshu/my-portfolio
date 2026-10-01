"use client";
import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SiGithub } from "react-icons/si";
import styles from "./Projects.module.css";
gsap.registerPlugin(Flip);
type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  details: string;
};
const projects: Project[] = [
  {
    id: "campusflow",
    title: "CampusFlow",
    description: "Event management platform",
    image: "/projects/campusflow.jpg",
    github: "https://github.com/debuggerhimanshu",
    details:
      "A full-stack event management platform designed to simplify event discovery, registration, organization, and participation for students.",
  },
  {
    id: "deeptrust",
    title: "DeepTrust",
    description: "AI powered deepfake detection",
    image: "/projects/deeptrust.jpg",
    github: "https://github.com/debuggerhimanshu",
    details:
      "An AI-based deepfake detection system that analyzes visual and audio signals to identify manipulated media.",
  },
  {
    id: "ciphernote",
    title: "CipherNote",
    description: "Encrypted digital notebook",
    image: "/projects/ciphernote.jpg",
    github: "https://github.com/debuggerhimanshu",
    details:
      "A privacy-focused digital notebook concept built around secure storage and encrypted personal notes.",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Creative developer portfolio",
    image: "/projects/portfolio.jpg",
    github: "https://github.com/debuggerhimanshu",
    details:
      "A creative developer portfolio combining interactive web experiences, development, visual design, and motion.",
  },
];
export function Projects() {
  /*
   * =====================================================
   * PROJECTS SECTION
   * =====================================================
   */
  const projectsSectionRef =
    useRef<HTMLElement>(null);
  /*
   * =====================================================
   * EXISTING HOVER / FLIP STATE
   * =====================================================
   */
  const gridRef =
    useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] =
    useState<string | null>(null);
  const activeRef =
    useRef<string | null>(null);
  const flipRef =
    useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef =
    useRef(false);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    insideGrid: false,
  });
  /*
   * =====================================================
   * PROJECT DETAIL DRAWER STATE
   * =====================================================
   */
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const selectedProjectRef =
    useRef<Project | null>(null);
  const detailTimelineRef =
    useRef<gsap.core.Timeline | null>(null);
  const detailEnterEndRef =
    useRef(0);
  const detailOpenRef =
    useRef(false);
  /*
   * =====================================================
   * MAGNETIC GITHUB BUTTON
   * =====================================================
   */
  const githubMagneticZoneRef =
    useRef<HTMLDivElement>(null);
  const githubButtonRef =
    useRef<HTMLAnchorElement>(null);
  const githubLabelRef =
    useRef<HTMLSpanElement>(null);
  /*
   * =====================================================
   * EXISTING HOVER / FLIP HELPERS
   * =====================================================
   */
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>(
        "[data-project-card]"
      )
    );
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
    const getCardUnderPointer = () => {
      const {
        x,
        y,
        insideGrid,
      } = pointerRef.current;
      if (!insideGrid) {
        return null;
      }
      const element =
        document.elementFromPoint(x, y);
      if (!(element instanceof HTMLElement)) {
        return null;
      }
      const card =
        element.closest<HTMLElement>(
          "[data-project-card]"
        );
      return (
        card?.dataset.projectCard ??
        null
      );
    };
    const resolvePointerState = () => {
      if (isAnimatingRef.current) {
        return;
      }
      const cardUnderPointer =
        getCardUnderPointer();
      if (
        cardUnderPointer &&
        cardUnderPointer !==
          activeRef.current
      ) {
        activate(cardUnderPointer);
        return;
      }
      if (!cardUnderPointer) {
        if (activeRef.current) {
          reset();
        }
      }
    };
    const activate = (id: string) => {
      if (!id) return;
      if (activeRef.current === id) {
        return;
      }
      if (isAnimatingRef.current) {
        return;
      }
      const state =
        Flip.getState(cards);
      clearLayoutClasses();
      const layoutClass =
        getLayoutClass(id);
      if (layoutClass) {
        grid.classList.add(
          layoutClass
        );
      }
      activeRef.current = id;
      isAnimatingRef.current = true;
      setActiveProject(id);
      flipRef.current =
        Flip.from(state, {
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
            isAnimatingRef.current =
              false;
            resolvePointerState();
          },
        });
    };
    const reset = () => {
      if (!activeRef.current) {
        return;
      }
      if (isAnimatingRef.current) {
        return;
      }
      const state =
        Flip.getState(cards);
      clearLayoutClasses();
      activeRef.current = null;
      isAnimatingRef.current = true;
      setActiveProject(null);
      flipRef.current =
        Flip.from(state, {
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
            isAnimatingRef.current =
              false;
            resolvePointerState();
          },
        });
    };
    const handlePointerMove = (
      event: PointerEvent
    ) => {
      pointerRef.current.x =
        event.clientX;
      pointerRef.current.y =
        event.clientY;
      if (isAnimatingRef.current) {
        return;
      }
      const target = event.target;
      if (
        !(target instanceof HTMLElement)
      ) {
        return;
      }
      const card =
        target.closest<HTMLElement>(
          "[data-project-card]"
        );
      const id =
        card?.dataset.projectCard;
      if (id) {
        activate(id);
      }
    };
    const handlePointerEnter = (
      event: PointerEvent
    ) => {
      pointerRef.current.x =
        event.clientX;
      pointerRef.current.y =
        event.clientY;
      pointerRef.current.insideGrid =
        true;
      if (isAnimatingRef.current) {
        return;
      }
      const target = event.target;
      if (
        !(target instanceof HTMLElement)
      ) {
        return;
      }
      const card =
        target.closest<HTMLElement>(
          "[data-project-card]"
        );
      const id =
        card?.dataset.projectCard;
      if (id) {
        activate(id);
      }
    };
    const handlePointerLeave = (
      event: PointerEvent
    ) => {
      pointerRef.current.x =
        event.clientX;
      pointerRef.current.y =
        event.clientY;
      pointerRef.current.insideGrid =
        false;
      if (isAnimatingRef.current) {
        return;
      }
      reset();
    };
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
      isAnimatingRef.current =
        false;
    };
  }, []);
  /*
   * =====================================================
   * MAGNETIC GITHUB BUTTON
   * =====================================================
   */
  useLayoutEffect(() => {
    const zone =
      githubMagneticZoneRef.current;
    const button =
      githubButtonRef.current;
    const label =
      githubLabelRef.current;
    if (
      !zone ||
      !button ||
      !label
    ) {
      return;
    }
    const strength = 0.4;
    const labelStrength = 0.24;
    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const rect =
        zone.getBoundingClientRect();
      const mapX =
        gsap.utils.mapRange(
          rect.left,
          rect.right,
          -rect.width / 2,
          rect.width / 2,
          event.clientX
        );
      const mapY =
        gsap.utils.mapRange(
          rect.top,
          rect.bottom,
          -rect.height / 2,
          rect.height / 2,
          event.clientY
        );
      gsap.to(button, {
        x: mapX * strength,
        y: mapY * strength,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
      gsap.to(label, {
        x: mapX * labelStrength,
        y: mapY * labelStrength,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    };
    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: true,
      });
      gsap.to(label, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: true,
      });
    };
    zone.addEventListener(
      "mousemove",
      handleMouseMove
    );
    zone.addEventListener(
      "mouseleave",
      handleMouseLeave
    );
    return () => {
      zone.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      zone.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      gsap.killTweensOf(button);
      gsap.killTweensOf(label);
      gsap.set(button, {
        x: 0,
        y: 0,
      });
      gsap.set(label, {
        x: 0,
        y: 0,
      });
    };
  }, []);
  /*
   * =====================================================
   * PROJECT CARD CURSOR
   * =====================================================
   * Visible only while hovering over a project card.
   * The native cursor remains active everywhere else.
   */
  useLayoutEffect(() => {
    const grid = gridRef.current;
    const section = projectsSectionRef.current;
    const flair = section?.querySelector<HTMLElement>(
      "[data-project-flair]"
    );

    if (!grid || !flair) return;

    let isVisible = false;

    gsap.set(flair, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.7,
      autoAlpha: 0,
    });

    const xTo = gsap.quickTo(flair, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(flair, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const showFlair = () => {
      if (isVisible) return;
      isVisible = true;
      gsap.to(flair, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.32,
        ease: "back.out(1.7)",
        overwrite: "auto",
      });
    };

    const hideFlair = () => {
      if (!isVisible) return;
      isVisible = false;
      gsap.to(flair, {
        autoAlpha: 0,
        scale: 0.7,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);

      const target = event.target;
      const card = target instanceof Element
        ? target.closest<HTMLElement>("[data-project-card]")
        : null;

      if (card && grid.contains(card)) showFlair();
      else hideFlair();
    };

    const handlePointerLeave = () => hideFlair();
    const handleWindowBlur = () => hideFlair();

    grid.addEventListener("pointermove", handlePointerMove);
    grid.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      grid.removeEventListener("pointermove", handlePointerMove);
      grid.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handleWindowBlur);
      gsap.killTweensOf(flair);
      gsap.set(flair, { autoAlpha: 0, scale: 0.7 });
    };
  }, []);

  /*
   * =====================================================
   * INTERRUPTIBLE PROJECT DETAIL TIMELINE
   * =====================================================
   */
  useLayoutEffect(() => {
    const drawer =
      document.querySelector<HTMLElement>(
        "[data-project-drawer]"
      );
    const backdrop =
      document.querySelector<HTMLElement>(
        "[data-project-backdrop]"
      );
    const panels =
      gsap.utils.toArray<HTMLElement>(
        "[data-project-panel]"
      );
    const closeButton =
      document.querySelector<HTMLElement>(
        "[data-project-close]"
      );
    if (
      !drawer ||
      !backdrop ||
      !panels.length ||
      !closeButton
    ) {
      return;
    }
    /*
     * Initial state
     */
    gsap.set(drawer, {
      autoAlpha: 0,
      pointerEvents: "none",
    });
    gsap.set(backdrop, {
      opacity: 0,
    });
    gsap.set(panels, {
      x: "110%",
      y: 0,
      rotation: 0,
    });
    gsap.set(closeButton, {
      opacity: 0,
      rotation: -45,
      scale: 0.7,
    });
    /*
     * =================================================
     * SINGLE TIMELINE
     * =================================================
     */
    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        detailOpenRef.current =
          false;
        gsap.set(drawer, {
          pointerEvents: "none",
        });
        setSelectedProject(null);
        selectedProjectRef.current =
          null;
      },
    });
    /*
     * =================================================
     * ENTER
     * =================================================
     */
    tl.set(drawer, {
      autoAlpha: 1,
      pointerEvents: "auto",
    })
      .to(
        backdrop,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          easeReverse: "power4.out",
        },
        0
      )
      /*
       * Three panels enter from the RIGHT.
       */
      .to(
        panels,
        {
          x: "0%",
          y: 0,
          rotation: 0,
          duration: 0.7,
          ease: "back.out(1.15)",
          easeReverse: "power3.in",
          stagger: {
            amount: 0.12,
            from: "start",
          },
        },
        0
      )
      /*
       * Close button.
       */
      .to(
        closeButton,
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.7)",
          easeReverse: "power3.in",
        },
        0.25
      )
      /*
       * ===============================================
       * PAUSE
       * ===============================================
       */
      .addPause();
    /*
     * Save the exact point where the ENTER
     * animation finishes.
     */
    detailEnterEndRef.current =
      tl.duration();
    /*
     * =================================================
     * EXIT
     * =================================================
     */
    tl
      /*
       * Close button disappears first.
       */
      .to(
        closeButton,
        {
          opacity: 0,
          rotation: 45,
          scale: 0.7,
          duration: 0.2,
          ease: "power3.in",
        }
      )
      /*
       * Panels fall down with random rotation.
       *
       * Bottom panel exits first.
       */
      .to(
        panels,
        {
          y: "110vh",
          rotation: "random(-8, 8)",
          duration: 1,
          ease: "power3.in",
          stagger: {
            from: "end",
            each: 0.06,
          },
        },
        "<"
      )
      /*
       * Backdrop fades with the panels.
       */
      .to(
        backdrop,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        },
        "<0.1"
      )
      /*
       * Reset panels so the next opening
       * starts from the right again.
       */
      .set(panels, {
        x: "110%",
        y: 0,
        rotation: 0,
      })
      .set(drawer, {
        autoAlpha: 0,
        pointerEvents: "none",
      });
    detailTimelineRef.current = tl;
    return () => {
      tl.kill();
      detailTimelineRef.current =
        null;
    };
  }, []);
  /*
   * =====================================================
   * OPEN PROJECT
   * =====================================================
   */
  const openProject = (
    project: Project
  ) => {
    const tl =
      detailTimelineRef.current;
    if (!tl) return;
    selectedProjectRef.current =
      project;
    setSelectedProject(project);
    detailOpenRef.current =
      true;
    /*
     * If the timeline has already reached
     * the exit section, restart the enter.
     */
    if (
      tl.time() >=
      detailEnterEndRef.current
    ) {
      tl.timeScale(1).restart();
    } else {
      /*
       * If the timeline was partially reversed,
       * play forward from its current position.
       */
      tl.timeScale(1).play();
    }
  };
  /*
   * =====================================================
   * CLOSE PROJECT
   * =====================================================
   */
  const closeProject = () => {
    const tl =
      detailTimelineRef.current;
    if (!tl) return;
    detailOpenRef.current =
      false;
    /*
     * IMPORTANT:
     *
     * If we're still inside the ENTER animation,
     * reverse it from exactly where it currently is.
     */
    if (
      tl.time() <
      detailEnterEndRef.current
    ) {
      tl.timeScale(1.5).reverse();
      return;
    }
    /*
     * If fully open, continue forward
     * into the completely different EXIT animation.
     */
    tl.timeScale(1).play();
  };
  /*
   * =====================================================
   * KEYBOARD ESC
   * =====================================================
   */
  useLayoutEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        detailOpenRef.current
      ) {
        closeProject();
      }
    };
    window.addEventListener(
      "keydown",
      handleKeyDown
    );
    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  });
  return (
    <>
      <section
        ref={projectsSectionRef}
        id="projects"
        className={styles.projects}
      >
        {/* =================================================
            PROJECTS SECTION CURSOR
            \================================================= */}
        <div
          data-project-flair
          className={`${styles.flair} ${styles.flair3}`}
          aria-hidden="true"
        >
          <img
            src="/icons/project-cursor.svg"
            alt=""
            draggable={false}
          />
        </div>
        <div className={styles.header}>
          <div className={styles.headerCopy}>
            <span className={styles.eyebrow}>
              ... /Projects ...
            </span>
            <p className={styles.description}>
              A selection of things I've
              built across development, design,
              AI, and creative technology.
            </p>
          </div>
          <h2 className={styles.title}>
            Projects
          </h2>
        </div>
        <div
          ref={gridRef}
          className={styles.projectGrid}
        >
          {projects.map(
            (project, index) => (
              <article
                key={project.id}
                data-project-card={
                  project.id
                }
                className={`
                  ${styles.projectCard}
                  ${styles[`project${index + 1}`]}
                  ${
                    activeProject ===
                    project.id
                      ? styles.active
                      : ""
                  }
                `}
                tabIndex={0}
                onClick={() =>
                  openProject(project)
                }
                onKeyDown={(event) => {
                  if (
                    event.key ===
                      "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    openProject(project);
                  }
                }}
              >
                <div
                  className={
                    styles.imageWrapper
                  }
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className={
                      styles.projectImage
                    }
                  />
                  <div
                    className={
                      styles.imageOverlay
                    }
                  />
                  <div
                    className={
                      styles.projectInfo
                    }
                  >
                    <div>
                      <span
                        className={
                          styles.projectNumber
                        }
                      >
                        0{index + 1}
                      </span>
                      <h3>
                        {project.title}
                      </h3>
                      <p>
                        {project.description}
                      </p>
                    </div>
                    <span
                      className={
                        styles.projectArrow
                      }
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
        {/* =================================================
            OUTER MAGNETIC GITHUB BUTTON
            \================================================= */}
        <div
          ref={githubMagneticZoneRef}
          className={
            styles.githubWrapper
          }
        >
          <a
            ref={githubButtonRef}
            href="https://github.com/debuggerhimanshu"
            target="_blank"
            rel="noopener noreferrer"
            className={
              styles.githubButton
            }
          >
            <span
              ref={githubLabelRef}
            >
              See My GitHub
            </span>
          </a>
        </div>
      </section>
      {/* =================================================
          PROJECT DETAIL DRAWER
          \================================================= */}
      <div
        data-project-drawer
        className={
          styles.projectDrawer
        }
        aria-hidden={
          selectedProject === null
        }
      >
        <div
          data-project-backdrop
          className={
            styles.projectBackdrop
          }
          onClick={closeProject}
        />
        <div
          className={
            styles.projectDrawerInner
          }
        >
          <button
            type="button"
            data-project-close
            className={
              styles.projectClose
            }
            onClick={closeProject}
            aria-label="Close project"
          >
            <span
              className={
                styles.closeLine
              }
            />
            <span
              className={
                styles.closeLine
              }
            />
          </button>
          {/* =================================================
              TOP — IMAGE
              \================================================= */}
          <div
            data-project-panel
            className={`
              ${styles.projectPanel}
              ${styles.projectImagePanel}
            `}
          >
            {selectedProject && (
              <img
                src={
                  selectedProject.image
                }
                alt={
                  selectedProject.title
                }
              />
            )}
          </div>
          {/* =================================================
              MIDDLE — DESCRIPTION
              \================================================= */}
          <div
            data-project-panel
            className={`
              ${styles.projectPanel}
              ${styles.projectDetailsPanel}
            `}
          >
            {selectedProject && (
              <>
                <span
                  className={
                    styles.detailEyebrow
                  }
                >
                  ... /Project details ...
                </span>
                <h3>
                  {selectedProject.title}
                </h3>
                <p
                  className={
                    styles.detailShort
                  }
                >
                  {
                    selectedProject.description
                  }
                </p>
                <p
                  className={
                    styles.detailDescription
                  }
                >
                  {
                    selectedProject.details
                  }
                </p>
              </>
            )}
          </div>
          {/* =================================================
              BOTTOM — GITHUB
              \================================================= */}
          <div
            data-project-panel
            className={`
              ${styles.projectPanel}
              ${styles.projectActionPanel}
            `}
          >
            {selectedProject && (
              <a
                href={
                  selectedProject.github
                }
                target="_blank"
                rel="noopener noreferrer"
                className={
                  styles.projectGithubButton
                }
              >
                <span
                  className={
                    styles.githubButtonMain
                  }
                >
                  <SiGithub
                    className={
                      styles.githubIcon
                    }
                    aria-hidden="true"
                  />
                  <span>
                    View GitHub Repository
                  </span>
                </span>
                <span
                  className={
                    styles.githubArrow
                  }
                >
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
