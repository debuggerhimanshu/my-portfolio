import styles from "./Education.module.css";

const education = [
  {
    period: "2024 - Present",
    duration: "3 years 6 months",
    institution: "VIT Bhopal University",
    course: "B.Tech Computer Science Engineering in Cybersecurity",

  },
  {
    period: "2020 - 2022",
    duration: "2 years",
    institution: "Bright Career School Purnea, Bihar",
    course: "Intermediate Schooling",

  },
  {
    period: "2015 - 2020",
    duration: "5 years",
    institution: "Jawahar Navodaya Vidyalaya Katihar, Bihar",
    course: "Metric Schooling / Class 6 to 10",

  },
];

export function Education() {
  return (
    <section id="education" className={styles.education}>
      <div className={styles.header}>
        <h2 className={styles.title}>Education</h2>

        <p className={styles.description}>
          Learning is never a <span><i>straight line.</i></span> Guided by twists,
          turns, and constant <span><i>growth</i></span>, here is my academic
          timeline.
        </p>
      </div>

      <div className={styles.timeline}>
        {education.map((item) => (
          <article
            key={`${item.period}-${item.institution}`}
            className={styles.row}
            >
            <div className={styles.period}>
              <span>{item.period}</span>
              <small>{item.duration}</small>
            </div>

            <div className={styles.institution}>
              {item.institution.split("\n").map((line, index) => (
                <span key={index}>{line}</span>
              ))}
            </div>

            <div className={styles.course}>
              {item.course.split("\n").map((line, index) => (
                <span key={index}>{line}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}