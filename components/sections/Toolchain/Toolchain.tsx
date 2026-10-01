"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";

import styles from "./Toolchain.module.css";

type Node = {
  id: string;
  name: string;
  column: "programming" | "stack" | "tools";
  x: number;
  y: number;
};

type Connection = {
  from: string;
  to: string;
};

/* ─────────────────────────────
   NODES
───────────────────────────── */

const nodes: Node[] = [
  // Programming
  { id: "java", name: "Java", column: "programming", x: 16.67, y: 16 },
  { id: "cpp", name: "C++", column: "programming", x: 16.67, y: 25.25 },
  { id: "c", name: "C", column: "programming", x: 16.67, y: 34.5 },
  { id: "python", name: "Python", column: "programming", x: 16.67, y: 43.75 },
  { id: "html", name: "HTML", column: "programming", x: 16.67, y: 53 },
  { id: "css", name: "CSS", column: "programming", x: 16.67, y: 62.25 },
  { id: "swift", name: "Swift", column: "programming", x: 16.67, y: 71.5 },
  { id: "javascript", name: "JavaScript", column: "programming", x: 16.67, y: 80.75 },
  { id: "typescript", name: "TypeScript", column: "programming", x: 16.67, y: 90 },

  // Tech Stacks
  { id: "dsa", name: "DSA", column: "stack", x: 47.3, y: 16 },
  { id: "frontend", name: "Frontend", column: "stack", x: 47.3, y: 28.33 },
  { id: "backend", name: "Backend", column: "stack", x: 47.3, y: 40.67 },
  { id: "system", name: "System", column: "stack", x: 47.3, y: 53 },
  { id: "security", name: "Security", column: "stack", x: 47.3, y: 65.33 },
  { id: "ai", name: "AI / ML", column: "stack", x: 47.3, y: 77.67 },
  { id: "design", name: "Design", column: "stack", x: 47.3, y: 90 },

  // Tools & Platform
  { id: "leetcode", name: "LeetCode", column: "tools", x: 76.3, y: 16 },
  { id: "codeforces", name: "Codeforces", column: "tools", x: 76.3, y: 23.4 },
  { id: "git", name: "Git", column: "tools", x: 76.3, y: 30.8 },
  { id: "docker", name: "Docker", column: "tools", x: 76.3, y: 38.2 },
  { id: "wireshark", name: "Wireshark", column: "tools", x: 76.3, y: 45.6 },
  { id: "sql", name: "SQL", column: "tools", x: 76.3, y: 53 },
  { id: "photoshop", name: "Photoshop", column: "tools", x: 76.3, y: 60.4 },
  { id: "framer", name: "Framer", column: "tools", x: 76.3, y: 67.8 },
  { id: "figma", name: "Figma", column: "tools", x: 76.3, y: 75.2 },
  { id: "after-effects", name: "After Effects", column: "tools", x: 76.3, y: 82.6 },
  { id: "premiere", name: "Premiere Pro", column: "tools", x: 76.3, y: 90 },
];

/* ─────────────────────────────
   CONNECTIONS
───────────────────────────── */

const connections: Connection[] = [
  // Programming → Tech Stack

  { from: "java", to: "dsa" },
  { from: "cpp", to: "dsa" },

  { from: "c", to: "system" },

  { from: "python", to: "ai" },
  { from: "python", to: "security" },

  { from: "html", to: "frontend" },
  { from: "css", to: "frontend" },

  { from: "javascript", to: "frontend" },
  { from: "javascript", to: "backend" },

  { from: "typescript", to: "frontend" },
  { from: "typescript", to: "backend" },

  { from: "swift", to: "frontend" },

  // Tech Stack → Tools

  { from: "dsa", to: "leetcode" },
  { from: "dsa", to: "codeforces" },

  { from: "frontend", to: "git" },
  { from: "frontend", to: "figma" },
  { from: "frontend", to: "framer" },

  { from: "backend", to: "git" },
  { from: "backend", to: "docker" },
  { from: "backend", to: "sql" },

  { from: "system", to: "git" },
  { from: "system", to: "docker" },

  { from: "security", to: "wireshark" },

  { from: "design", to: "photoshop" },
  { from: "design", to: "figma" },
  { from: "design", to: "framer" },
  { from: "design", to: "after-effects" },
  { from: "design", to: "premiere" },
];

/* ─────────────────────────────
   LOCAL SVG ICONS
───────────────────────────── */

const icons: Record<string, string> = {
  java: "/icons/java.svg",
  cpp: "/icons/cpp.svg",
  c: "/icons/c.svg",
  python: "/icons/python.svg",
  html: "/icons/html.svg",
  css: "/icons/css.svg",
  swift: "/icons/swift.svg",
  javascript: "/icons/javascript.svg",
  typescript: "/icons/typescript.svg",

  leetcode: "/icons/leetcode.svg",
  codeforces: "/icons/codeforces.svg",
  git: "/icons/git.svg",
  docker: "/icons/docker.svg",
  wireshark: "/icons/wireshark.svg",
  sql: "/icons/sql.svg",

  photoshop: "/icons/photoshop.svg",
  framer: "/icons/framer.svg",
  figma: "/icons/figma.svg",
  "after-effects": "/icons/after-effects.svg",
  premiere: "/icons/premiere.svg",
};

/* ─────────────────────────────
   COMPONENT
───────────────────────────── */

export function Toolchain() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const nodeMap = useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]));
  }, []);

  const connectedIds = useMemo(() => {
    if (!activeId) {
      return new Set<string>();
    }

    const result = new Set<string>();

    connections.forEach(({ from, to }) => {
      if (from === activeId) {
        result.add(to);
      }

      if (to === activeId) {
        result.add(from);
      }
    });

    return result;
  }, [activeId]);

  const isNodeVisible = (id: string) => {
    if (!activeId) {
      return true;
    }

    return id === activeId || connectedIds.has(id);
  };

  const isConnectionActive = (from: string, to: string) => {
    if (!activeId) {
      return false;
    }

    return from === activeId || to === activeId;
  };

  return (
    <section id="skills" className={styles.toolchain}>
      {/* ───────── HEADER ───────── */}

      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>
            ... /Skills ...
          </span>

          <p className={styles.description}>
            The languages I build with, the disciplines I
            work across, and the tools I use to turn ideas
            into things that work.
          </p>
        </div>

        <h2 className={styles.title}>
          Toolchain
        </h2>
      </div>

      {/* ───────── GRAPH ───────── */}

      <div className={styles.graph}>
        {/* Column labels */}

        <div
          className={`${styles.columnLabel} ${styles.programmingLabel}`}
        >
          Programming
        </div>

        <div
          className={`${styles.columnLabel} ${styles.stackLabel}`}
        >
          Tech Stacks
        </div>

        <div
          className={`${styles.columnLabel} ${styles.toolsLabel}`}
        >
          Tools &amp; Platform
        </div>

        {/* ───────── CONNECTIONS ───────── */}

        <svg
          className={styles.connections}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {connections.map(({ from, to }, index) => {
            const fromNode = nodeMap.get(from);
            const toNode = nodeMap.get(to);

            if (!fromNode || !toNode) {
              return null;
            }

            const active = isConnectionActive(from, to);

            return (
              <g key={`${from}-${to}-${index}`}>
                <motion.line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  vectorEffect="non-scaling-stroke"
                  stroke="currentColor"
                  className={styles.connectionLine}
                  animate={{
                    opacity: activeId
                      ? active
                        ? 0.9
                        : 0.04
                      : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                />

                {active && (
                  <motion.line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    vectorEffect="non-scaling-stroke"
                    stroke="currentColor"
                    className={styles.activeLine}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    transition={{
                      duration: 0.25,
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* ───────── NODES ───────── */}

        {nodes.map((node) => {
          const visible = isNodeVisible(node.id);
          const active = activeId === node.id;
          const icon = icons[node.id];

          return (
            <motion.button
              key={node.id}
              type="button"
              className={styles.node}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              onMouseEnter={() => setActiveId(node.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(node.id)}
              onBlur={() => setActiveId(null)}
              animate={{
                opacity: visible ? 1 : 0.16,
                scale: active ? 1.06 : 1,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              <div
                className={`${styles.nodeContent} ${
                  active ? styles.nodeActive : ""
                }`}
              >
                {icon && (
                  <img
                    src={icon}
                    alt=""
                    className={styles.nodeIcon}
                    aria-hidden="true"
                  />
                )}

                <span>{node.name}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}