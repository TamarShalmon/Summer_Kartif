"use client"
import React, { useEffect, useState } from "react";
import styles from "./featured.module.css";

const Featured = () => {
  const [fontSize, setFontSize] = useState(55); // גודל פונט התחלתי

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (scrolled > 0) {
        setFontSize(20); // הקטן ל-20px כאשר יש גלילה כלשהי
      } else {
        // אם המסך בגודל קטן מ-640px, גודל הפונט יהיה 36px, אחרת 45px או 55px לפי גודל המסך
        if (window.innerWidth <= 640) {
          setFontSize(36);
        } else if (window.innerWidth <= 930) {
          setFontSize(45);
        } else {
          setFontSize(55);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // לעדכן גם בעת שינוי גודל חלון

    // הסרה של המאזין כשמרכיב יוצא מהדף
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
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
    </div>
  );
};

export default Featured;

