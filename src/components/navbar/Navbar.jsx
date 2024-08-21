import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo} >
        <Image src="/logo.png" alt="logo" width={300} height={80} className={styles.logoImage} />
        <span className={styles.betaText}>beta</span>
      </Link>

      <div className={styles.links}>
        <Link href="/" className={styles.link}>דף הבית</Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;