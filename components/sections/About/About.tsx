import styles from "./About.module.css";
import { PageDecorations } from "@/components/effects/PageDecorations";

export function About() {
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
        <article className={`${styles.skillCard} ${styles.programming}`}>
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
        <article className={`${styles.skillCard} ${styles.development}`}>
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
        <article className={`${styles.skillCard} ${styles.aiCloud}`}>
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
        <article className={`${styles.skillCard} ${styles.creative}`}>
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