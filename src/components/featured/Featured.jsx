import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>שלום לכל התושבים!</b> 
        <br/>בואו תגלו מה יש בסביבה שלכם.
        <br/>ברשת החברתית של כרטיף.
      </h1>
      <div className={styles.post}>
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
      </div>
    </div>
  );
};

export default Featured;
