import styles from "./registerPage.module.css";
import RegisterForm from '@/components/registerForm/RegisterForm';
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>הרשמה</h1>
        <RegisterForm />
        <p className={styles.loginLink}>
          כבר יש לכם חשבון? <Link href="/login">התחברו כאן</Link>
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

export default RegisterPage;