"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import AuthModal from "../../modals/authModal/AuthModal"

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { status } = useSession();

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setOpen(false);
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited && status === "unauthenticated") {
      setShowModal(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, [status]);

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={`${styles.link} ${styles.authButton}`}>
          התחבר
        </Link>
      ) : (
        <span className={`${styles.link} ${styles.authButton}`} onClick={signOut}>
          התנתק
        </span>
      )}
      <div className={`${styles.burger} ${open ? styles.open : ''}`} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      <div className={`${styles.responsiveMenu} ${open ? styles.open : ''}`}>
        <Link href="/" onClick={handleLinkClick}>דף הבית</Link>
        <Link href="/write" onClick={handleLinkClick}>פרסם המלצה</Link>
        <Link href="/userDashboard" onClick={handleLinkClick}>ההמלצות שלי</Link>
        {status === "unauthenticated" ? (
          <Link href="/login">
            התחבר
          </Link>
        ) : (
          <span onClick={signOut}>
            התנתק
          </span>
        )}
      </div>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default AuthLinks;