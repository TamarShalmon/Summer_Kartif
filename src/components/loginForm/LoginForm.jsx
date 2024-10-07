"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./loginForm.module.css";
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-fredoka',
})

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("הרשמה לא תקינה");
        return;
      }
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={fredoka.className}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="הכנס אימייל"
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="הכנס סיסמה"
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>כניסה</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
