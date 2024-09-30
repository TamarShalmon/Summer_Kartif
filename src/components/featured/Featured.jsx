"use client"
import React, { useEffect, useState } from "react";
import styles from "./featured.module.css";

const Featured = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${isScrolled ? styles.scrolled : ''}`}>
        בואו לגלות את המקומות הכי שווים דרך חוויות של החברים מהישוב.
        <br />כאן תוכלו לשתף ולהמליץ על מקומות בילוי,
        <br />אטרקציות וטיולים אהובים.
        <br />בטוחים שתהנו!
      </h1>
    </div>
  );
};

export default Featured;

