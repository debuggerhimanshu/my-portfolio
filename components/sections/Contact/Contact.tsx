
"use client";

import styles from "./Contact.module.css";

const socials = [
  { name: "GitHub", href: "https://github.com/debuggerhimanshu" },
  { name: "LinkedIn", href: "YOUR_LINKEDIN_URL" },
  { name: "Instagram", href: "https://instagram.com/creative.him" },
  { name: "YouTube", href: "YOUR_YOUTUBE_URL" },
];

export default function Contact() {
  return (
    <footer className={styles.contact} id="contact">
      <div className={styles.topBar}>
        <a href="#" className={styles.brand}>
          ZODIAC DEVELOPER<span>®</span>
        </a>

        <div className={styles.availability}>
          <span className={styles.statusDot} />
          Available for projects
        </div>
      </div>

      <div className={styles.main}>
        <p className={styles.eyebrow}>
          HAVE AN IDEA? LET'S MAKE IT REAL.
        </p>

        <h2 className={styles.title}>
          LET'S BUILD
          <br />
          <span>SOMETHING.</span>
          <br />
          EXTRAORDINARY<span className={styles.period}>.</span>
        </h2>

        <div className={styles.bottomContent}>
          <p className={styles.description}>
            Have a project in mind, want to collaborate, or just
            want to say hello? Let's create something meaningful.
          </p>

          <a
            className={styles.contactButton}
            href="mailto:YOUR_EMAIL@example.com?subject=Project%20Inquiry"
          >
            <span>Let's talk about your project</span>
            <span className={styles.arrow}>↗</span>
          </a>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.socials}>
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
            >
              {social.name}
              <span>↗</span>
            </a>
          ))}
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Zodiac Developer
        </p>

        <a className={styles.backToTop} href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
