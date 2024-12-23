"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import LoginForm from "@/components/loginForm/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.approved) {
        router.push("/");
      } else {
        router.push("/pendingApproval");
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className={styles.loading}>טוען...</div>;
  }

  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          {/* <br /><b>לרגל השקת האתר, הכניסה פתוחה לכולם!
        <br />בשבועיים הקרובים, האתר פתוח להוספת המלצות ותגובות. לאחר מכן, יתאפשר לתושבי כרמי קטיף בלבד.</b> */}
        </div>
        <div className={styles.socialButton} onClick={handleSignIn}>
          התחברו עם Google
          <Image src="/google.png" alt="logo" width={30} height={30} className={styles.image} />
        </div>
        <div className={styles.divider}>
          <span>או</span>
        </div>
        <LoginForm />

        <p className={styles.registerLink}>
          אין לכם חשבון? <Link href="/registerPage">הירשמו כאן</Link>
        </p>

        <div className={styles.divider}></div>
        
        <div className={styles.infoText}>
          <p><strong>רוצים גם פלטפורמה כזו לקהילה שלכם?</strong></p>
          <p>פנו אליי ונגשים את זה יחד!</p>
          <p>tamar.shalmon1@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;