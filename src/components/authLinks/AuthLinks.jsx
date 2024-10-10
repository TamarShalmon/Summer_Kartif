"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./authLinks.module.css";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import AuthModal from "../../modals/authModal/AuthModal"

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { status, data: session } = useSession();

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

  const renderAuthButton = () => {
    if (status === "unauthenticated") {
      return (
        <Link href="/login" className={`${styles.link} ${styles.authButton}`}>
          <span className={styles.authButtonContent}>התחברות</span>
        </Link>
      );
    }
    return (
      <div className={`${styles.link} ${styles.authButton}`} onClick={handleSignOut}>
        <span className={styles.authButtonContent}>
          <span className={styles.authButtonUser}>
            <Image
              src={session?.user?.image || "/user.png"}
              alt=""
              width={35}
              height={35}
              className={styles.image}
            />
            {session?.user?.name}
          </span>
          <span className={styles.authButtonAction}>
            התנתקות
          </span>
        </span>
      </div>
    );
  };

  const renderAuthShow = () => {
    if (status === "unauthenticated") {
      return <Link href="/login">התחברות</Link>;
    }
    return (
      <div onClick={handleSignOut}>
        <div style={{ fontSize: "18px", textAlign: "center" }}>{session?.user?.name}</div>
        <div style={{ paddingTop: "8px", textAlign: "center" }}>התנתקות</div>
      </div>
    );
  };

  return (
    <>
      {renderAuthButton()}
      <div className={`${styles.burger} ${open ? styles.open : ''}`} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      <div className={`${styles.responsiveMenu} ${open ? styles.open : ''}`}>
        <div className={styles.authShow}>
          <div>
            <Image
              src={session?.user?.image || "/user.png"}
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />
          </div>
          <div>{renderAuthShow()}</div>
        </div>
        <Link href="/" onClick={handleLinkClick}>דף הבית</Link>
        <Link href="/write" onClick={handleLinkClick}>פרסם המלצה</Link>
        <Link href="/userDashboard" onClick={handleLinkClick}>ההמלצות שלי</Link>
      </div>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default AuthLinks;