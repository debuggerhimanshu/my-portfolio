import styles from "./PageDecorations.module.css";

interface PageDecorationsProps {
  variant?: "page" | "about";
}

export function PageDecorations({
  variant = "page",
}: PageDecorationsProps) {
  return (
    <div
      className={`${styles.decorations} ${styles[variant]}`}
      aria-hidden="true"
    >
      {variant === "page" && (
        <>
          <div className={`${styles.circle} ${styles.circleTop}`} />
          <div className={`${styles.circle} ${styles.circleRight}`} />
          <div className={`${styles.circle} ${styles.circleBottomLeft}`} />
        </>
      )}

      {variant === "about" && (
        <div className={`${styles.circle} ${styles.circleAbout}`} />
      )}
    </div>
  );
}