import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logo} >
            <Image src="/logo.png" alt="logo" width={300} height={80} className={styles.logoImage} />
            <span className={styles.betaText}>beta</span>
          </Link>
        </div>
        <p className={styles.desc}>
          בואו לגלות את המקומות הכי שווים דרך חוויות של החברים מהישוב.
          <br />כאן תוכלו לשתף ולהמליץ על מקומות בילוי,
          <br />אטרקציות וטיולים אהובים.
          <br />בטוחים שתהנו!
        </p>
        {/* <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/tiktok.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div> */}
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>מפת אתר</span>
          <Link href="/">דף הבית</Link>
          <Link href="/login">התחברות</Link>
          <Link href="/">יצירת קשר</Link>
          <Link href="/">כל הזכויות שמורות</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>קטגוריות מובילות</span>
          <Link href="/">מעיינות</Link>
          <Link href="/">בריכות</Link>
          <Link href="/">לאכול בחוץ</Link>
          <Link href="/">אטרקציות</Link>
          <Link href="/">בריכות שחייה</Link>
        </div>
        {/* <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
