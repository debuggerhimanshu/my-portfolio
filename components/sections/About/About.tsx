"use client";

import { useEffect, useState } from "react";
import styles from "./About.module.css";

export function About() {
  const [activeCard, setActiveCard] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveCard((current) => (current + 1) % 4);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section id="about" className={styles.about}>
      <div className={styles.aboutHeader}>
        <span className={styles.eyebrow}>... /About me ...</span>

        <div className={styles.introduction}>
          <p className={styles.introMain}>
            Hello! I&apos;m Himanshu, a developer fascinated by
            technology, design, and turning ideas into useful digital
            experiences.
          </p>

          <p className={styles.introSecondary}>
            I enjoy building across software development, AI,
            cybersecurity, and creative technology while constantly
            learning, experimenting, and building.
          </p>
        </div>
      </div>

      <div className={styles.aboutGrid}>
        {/* Programming */}
        <article
          className={`${styles.skillCard} ${styles.programming} ${
            activeCard === 0 ? styles.active : ""
          }`}
          onMouseEnter={() => {
            setActiveCard(0);
            setIsHovering(true);
          }}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className={styles.cardNumber}>01</span>

          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>Programming</span>

            <p>
              Java / C++ / Python / C /
              <br />
              JavaScript / TypeScript / HTML / CSS
            </p>
          </div>
        </article>

        {/* Development */}
        <article
          className={`${styles.skillCard} ${styles.development} ${
            activeCard === 1 ? styles.active : ""
          }`}
          onMouseEnter={() => {
            setActiveCard(1);
            setIsHovering(true);
          }}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className={styles.cardNumber}>02</span>

          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>Development</span>

            <p>
              React / Next.js / Node.js /
              <br />
              Express.js / Tailwind CSS
            </p>
          </div>
        </article>

        {/* Photo */}
        <div className={styles.photoCard}>
          <img
            src="/profile.png"
            alt="Himanshu"
            className={styles.photo}
          />
        </div>

        {/* Zodiac Wave */}
        <div className={styles.zodiacWave}>
          <div className={styles.zodiac}>
            {"ZODIAC".split("").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </div>

          <div className={styles.wave}>Wave</div>
        </div>

        {/* AI / Data / Cloud */}
        <article
          className={`${styles.skillCard} ${styles.aiCloud} ${
            activeCard === 2 ? styles.active : ""
          }`}
          onMouseEnter={() => {
            setActiveCard(2);
            setIsHovering(true);
          }}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className={styles.cardNumber}>03</span>

          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>AI / Data / Cloud</span>

            <p>
              TensorFlow / PyTorch / Scikit-learn /
              <br />
              NumPy / AWS / Firebase / Supabase
            </p>
          </div>
        </article>

        {/* Creative / Tools */}
        <article
          className={`${styles.skillCard} ${styles.creative} ${
            activeCard === 3 ? styles.active : ""
          }`}
          onMouseEnter={() => {
            setActiveCard(3);
            setIsHovering(true);
          }}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className={styles.cardNumber}>04</span>

          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>Creative / Tools</span>

            <p>
              Figma / Framer / Photoshop /
              <br />
              After Effects / Git / Linux / Wireshark
            </p>
          </div>

          {/* Editorial note */}
          <div className={styles.creativeNote}>
            <span>Creative / Visual</span>
            Design, motion, and visual tools I use to bring ideas to life.
          </div>
        </article>
      </div>
    </section>
  );
}