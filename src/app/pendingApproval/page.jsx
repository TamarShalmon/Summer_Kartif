"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./pendingApproval.module.css";


const PendingApprovalPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session.user.approved) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>טוען...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>החשבון שלך ממתין לאישור - אנחנו כבר כמעט שם!</h1>
      <p className={styles.desc}>
        <br /><b>ברוך הבא ל"קטיפניקים ממליצים"!</b> 
        <br />חשבונך נוצר בהצלחה וכעת מחכה לאישור מהצוות. 
        <br />אנחנו רוצים לשמור על קהילה איכותית וייחודית, 
        <br />ולכן תהליך האישור מבטיח שרק תושבי כרמי קטיף יוכלו לשתף ולהגיב על ההמלצות.
        <br />
        <br />נודיע לך ברגע שהחשבון יאושר – זה לא ייקח הרבה זמן!
        <br />בינתיים, נשמח אם תמשיך לגלוש ולגלות המלצות חדשות באתר.
        <br />
        <br /><b>רוצים גם פלטפורמה כזו לקהילה שלכם?</b>
        <br />פנו אליי ונגשים את זה יחד!
        <br />tamar.shalmon1@gmail.com

      </p>
      <p></p>
    </div>
  );
};

export default PendingApprovalPage;