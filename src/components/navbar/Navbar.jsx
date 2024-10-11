import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";

const Navbar = () => {
  return (
    <div className={styles.container}>

      <div className={styles.links}>
        <Link href="/" className={styles.logo} >
          <Image src="/logo.png" alt="logo" width={300} height={80} className={styles.logoImage} />
        </Link>
        <Link href="/" className={styles.link}>
          דף הבית<span style={{ color: "#9c7d6a", fontSize: "28px", marginRight: "8px" }}> |</span>
        </Link>
        <Link href="/write" className={styles.link}>
          פרסום המלצה<span style={{ color: "#9c7d6a", fontSize: "28px", marginRight: "15px" }}>|</span>
        </Link>
        <Link href="/userDashboard" className={styles.link}>
          ההמלצות שלי
        </Link>
      </div>

      <AuthLinks />

    </div>
  );
};

export default Navbar;