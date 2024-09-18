import React from "react";
import styles from "./footerTamar.module.css";
import Link from "next/link";

const FooterTamar = () => {
  return (
    <div className={styles.container} dir="ltr">
      <div className={styles.info}>
        © BY Tamar Shalmon | 052-6431611 | tamar.shalmon1@gmail.com |{" "}
        <Link href="https://www.linkedin.com/in/tamar-shalmon-318ab01a0/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Link>
      </div>
    </div>
  );
};

export default FooterTamar;
