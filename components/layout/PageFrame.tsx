import styles from "./PageFrame.module.css";
import { PageDecorations } from "@/components/effects/PageDecorations";

interface PageFrameProps {
  children: React.ReactNode;
}

export function PageFrame({ children }: PageFrameProps) {
  return (
    <div className={styles.frame}>
      <PageDecorations />

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}