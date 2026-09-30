import styles from "./PageDecorations.module.css";

export function PageDecorations() {
  return (
    <div className={styles.decorations} aria-hidden="true">
      <div className={`${styles.circle} ${styles.circleTop}`} />
      <div className={`${styles.circle} ${styles.circleRight}`} />
    </div>
  );
}