"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/")
  }

  return (
    <div className={styles.container}>

      <div className={styles.wrapper}>
      <Image src="/logo.png" alt="logo" width={300} height={80} className={styles.logoImage} />
        <div className={styles.socialButton} onClick={() => signIn("google")}>
          התחברו עם Google
          <Image src="/google.png" alt="logo" width={30} height={30} className={styles.image} />
        </div>
        {/* <div className={styles.socialButton}>Sign in with Github</div> */}
        {/* <div className={styles.socialButton}>Sign in with Facebook</div> */}
      </div>
    </div>
  );
};

export default LoginPage;
