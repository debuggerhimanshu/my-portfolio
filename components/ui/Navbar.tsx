import styles from "./Navbar.module.css";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className={styles.navbar}>
      <a href="#home" className={styles.brand}>
        Zodiac Developer
      </a>

      <nav className={styles.navigation} aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className={styles.link}>
            {item.label}
          </a>
        ))}
      </nav>

      <a href="#contact" className={styles.profile} aria-label="Contact">
            <img
    src="/profile.png"
    alt="Himanshu Ranjan"
    className={styles.profileImage}
  />
      </a>
    </header>
  );
}