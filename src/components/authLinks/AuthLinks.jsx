"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setOpen(false);
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          התחבר
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            פרסם המלצה
          </Link>
          <Link href="/userDashboard" className={styles.link}>
            ההמלצות שלי
          </Link>
          <span className={styles.link} onClick={signOut}>
            התנתק
          </span>
        </>
      )}
      <div className={`${styles.burger} ${open ? styles.open : ''}`} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/" onClick={handleLinkClick}>דף הבית</Link>
          {status === "unauthenticated" ? (
            <Link href="/login" onClick={handleLinkClick}>התחבר</Link>
          ) : (
            <>
              <Link href="/write" onClick={handleLinkClick}>פרסם המלצה</Link>
              <Link href="/userDashboard" onClick={handleLinkClick} >ההמלצות שלי</Link>
              <span className={styles.links} onClick={handleSignOut}>
                התנתק
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;