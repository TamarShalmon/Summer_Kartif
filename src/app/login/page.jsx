"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

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
        <div className={styles.socialButton} onClick={handleSignIn}>
          התחברו עם Google
          <Image src="/google.png" alt="logo" width={30} height={30} className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;