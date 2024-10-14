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
          <img
            src={"/user.png"}
            className={styles.image}
            width={25}
            height={25}
            alt="User"
          />
          <span className={styles.authButtonContent}>כניסה</span>
        </Link>
      );
    }
    return (
      <div className={`${styles.link} ${styles.authButton}`}>
        <span className={styles.authButtonContent}>
          <span className={styles.authButtonUser}>
            <Image
              src={"/user.png"}
              alt=""
              width={35}
              height={35}
              className={styles.image}
            />
            {session?.user?.name}
          </span>
        </span>
        <div className={styles.dropdown}>
          <button onClick={handleSignOut} className={styles.dropdownItem}>התנתק</button>
        </div>
      </div>
    );
  };

  const renderAuthShow = () => {
    if (status === "unauthenticated") {
      return <Link href="/login" onClick={handleLinkClick}>כניסה</Link>;
    }
    return (
      <div style={{ fontSize: "18px", textAlign: "center" }}>{session?.user?.name}</div>
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
      <div className={open ? styles.overlay : ""}>
        <div className={`${styles.responsiveMenu} ${open ? styles.open : ''}`}>
          <div className={styles.authShow}>
            <div>
              <Image
                src={"/user.png"}
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
          {status === "authenticated" && (
            <Link href="#" onClick={handleSignOut}>התנתק</Link>
          )}
        </div>
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default AuthLinks;
