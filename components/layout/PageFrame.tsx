import styles from "./PageFrame.module.css";

interface PageFrameProps {
  children: React.ReactNode;
}

export function PageFrame({ children }: PageFrameProps) {
  return <div className={styles.frame}>{children}</div>;
}