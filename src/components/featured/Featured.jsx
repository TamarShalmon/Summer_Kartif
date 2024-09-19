"use client"
import React, { useEffect, useState } from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  const [fontSize, setFontSize] = useState(55); // גודל פונט התחלתי

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (scrolled > 0) {
        setFontSize(20); // הקטן ל-20px כאשר יש גלילה כלשהי
      } else {
        setFontSize(55); // הגודל המקורי אם אין גלילה
      }
    };

    window.addEventListener("scroll", handleScroll);

    // הסרה של המאזין כשמרכיב יוצא מהדף
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title} style={{ fontSize: `${fontSize}px` }}>
        בואו לגלות את המקומות הכי שווים דרך חוויות של החברים מהישוב.
        <br />כאן תוכלו לשתף ולהמליץ על מקומות בילוי,
        <br />אטרקציות וטיולים אהובים.
        <br />בטוחים שתהנו!
      </h1>
      {/* <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>לכיש, חבל ארץ מהמם.</h1>
          <p className={styles.postDesc}>
           אתם תהנו מכל מה שיש בסביבה, בזכות הקהילה שלכם, שמשתפת אתכם 
           אם תפרסמו המלצה, כך תעזרו לכולם לדעת מה יש.
           תמליצו ותתנו תגובות ככה כולם יהנו
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div> */}
    </div>
  );
};

export default Featured;
