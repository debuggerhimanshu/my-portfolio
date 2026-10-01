"use client";

import styles from "./Projects.module.css";

const projects = [
  {
    id: "project-1",
    title: "CampusFlow",
    className: styles.projectLarge,
  },
  {
    id: "project-2",
    title: "DeepTrust",
    className: styles.projectTall,
  },
  {
    id: "project-3",
    title: "CipherNote",
    className: styles.projectSmall,
  },
  {
    id: "project-4",
    title: "Portfolio",
    className: styles.projectSmall,
  },
];

export function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.topBorder} />

      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>
            ... /Projects ...
          </span>

          <p className={styles.description}>
            The languages I build with, the disciplines I
            work across, and the tools I use to turn ideas
            into things that work.
          </p>
        </div>
        <h2 className={styles.title}>Projects</h2>
      </div>

      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <article
            key={project.id}
            className={`${styles.projectCard} ${project.className}`}
          >
            <div className={styles.projectPlaceholder}>
              <span>{project.title}</span>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.githubWrapper}>
        <a
          href="https://github.com/debuggerhimanshu"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubButton}
        >
          GitHub
        </a>
      </div>
    </section>
  );
}