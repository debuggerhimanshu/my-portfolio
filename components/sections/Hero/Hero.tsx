"use client";

import { useState } from "react";
import styles from "./Hero.module.css";

import {
  SiGithub,
  SiInstagram,
  SiGmail,
  SiYoutube,
} from "react-icons/si";

import { FaLinkedinIn } from "react-icons/fa6";

const socials = [
  {
    label: "Github",
    href: "#",
    icon: SiGithub,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
  {
    label: "Instagram",
    href: "#",
    icon: SiInstagram,
  },
  {
    label: "Gmail",
    href: "#",
    icon: SiGmail,
  },
  {
    label: "YouTube",
    href: "#",
    icon: SiYoutube,
  },
];

const projects = [
  {
    title: "DeepTrust",
    description:
      "AI-powered deepfake detection for audio and video.",
    image: "/projects/deeptrust.jpg",
  },
  {
    title: "CampusFlow",
    description:
      "A platform designed to simplify campus workflows.",
    image: "/projects/campusflow.jpg",
  },
  {
    title: "CipherNote",
    description:
      "A privacy-focused encrypted notes application.",
    image: "/projects/ciphernote.jpg",
  },
];

export function Hero() {
  const [activeProject, setActiveProject] = useState(0);

  const previousProject = () => {
    setActiveProject((current) =>
      current === 0 ? projects.length - 1 : current - 1
    );
  };

  const nextProject = () => {
    setActiveProject((current) =>
      current === projects.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section id="home" className={styles.hero}>
      {/* Hero heading */}

      <div className={styles.headingArea}>
        <div className={styles.description}>
          <p>
            I’m fascinated by technology and love turning ideas
            into meaningful digital experiences through code,
            design, and experimentation.
          </p>
        </div>

        <h1 className={styles.heading}>
          <span className={styles.firstLine}>Fascinated</span>

          <span className={styles.secondLine}>
            Developer
          </span>
        </h1>

        <a href="#projects" className={styles.projectsButton}>
          <span>Projects</span>

          <span className={styles.buttonArrow}>→</span>
        </a>
      </div>

      {/* Social links */}

      <div className={styles.socials}>
        {socials.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.label}
              href={social.href}
              className={styles.social}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className={styles.socialIcon} />
              <span>{social.label}</span>
            </a>
          );
        })}
      </div>

      {/* Project carousel */}

<div className={styles.projectCarousel}>
  <div className={styles.projectViewport}>
    {projects.map((project, index) => {
      let position = index - activeProject;

      if (position > 1) {
        position -= projects.length;
      }

      if (position < -1) {
        position += projects.length;
      }

      return (
        <article
          key={project.title}
          className={`${styles.projectCard} ${
            position === 0
              ? styles.projectCardActive
              : ""
          }`}
          style={{
            transform: `translateX(${position * 104}%)`,
          }}
        >
          <div className={styles.projectImage}>
  <img
    src={project.image}
    alt={`${project.title} project preview`}
  />
</div>

<div className={styles.projectOverlay}>
  <div className={styles.projectContent}>
    <h3>{project.title}</h3>

    <p>{project.description}</p>

    <div className={styles.projectActions}>
      <a
        href="#projects"
        className={styles.viewProject}
      >
        View project
      </a>

      <a
        href="#projects"
        className={styles.projectArrow}
        aria-label={`View ${project.title}`}
      >
        →
      </a>
    </div>
  </div>
</div>
        </article>
      );
    })}
  </div>

  {/* Previous */}

  <button
    type="button"
    className={`${styles.sliderButton} ${styles.sliderButtonLeft}`}
    onClick={previousProject}
    aria-label="Previous project"
  >
    ←
  </button>

  {/* Next */}

  <button
    type="button"
    className={`${styles.sliderButton} ${styles.sliderButtonRight}`}
    onClick={nextProject}
    aria-label="Next project"
  >
    →
  </button>
</div>
    </section>
  );
}