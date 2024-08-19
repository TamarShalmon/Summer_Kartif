"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-fredoka',
})

const Pagination = ({ page, hasPrev, hasNext, cat }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}&cat=${cat}`)} 
      >
        הקודם
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => router.push(`?page=${page + 1}&cat=${cat}`)}
      >
        הבא
      </button>
    </div>
  );
};

export default Pagination;
