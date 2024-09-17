"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-fredoka',
})

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  // console.log("Fetched data:", data);

  if (!res.ok) {
    const error = new Error(data.message);
    console.error("Fetch error:", error);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {

  const { status, session } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/comments`,
    fetcher
  );
  // console.log("Client postSlug:", postSlug);
  // console.log("Fetched comments:", data);

  // Filter comments based on postSlug
  const filteredComments = data?.filter((comment) => comment.postSlug === postSlug);
  // console.log("filteredComments:", filteredComments);


  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    // console.log("Submitting comment:", { desc, postSlug });
    // try {
    // const response = 
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),

      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    // if (!response.ok) {
    //   throw new Error("Failed to submit comment");
    // }
    // const result = await response.json();
    // // console.log("Comment submitted successfully:", result);
    mutate(); // Re-fetch comments after submitting
    setDesc("");
    // } catch (error) {
    //   // console.error("Error submitting comment:", error);
    // }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={fredoka.className}>
      <div className={styles.container}>
        <h1 className={styles.title}>תגובות</h1>

        {!session?.user?.approved ? (
          <div className={styles.write}>
            <textarea
              placeholder="מה אתם חושבים? שתפו אותנו בתגובות"
              className={styles.input}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className={styles.button} onClick={handleSubmit}>
              שלחו תגובה
            </button>
          </div>
        ) : (
          <Link href="/login">התחברו כדי לכתוב תגובות להמלצות</Link>
        )}

        <div className={styles.comments}>
          {isLoading
            ? "loading"
            : filteredComments?.map((item) => (
              <div className={styles.comment} key={item.id}>
                <div className={styles.user}>
                  {item?.user?.image && (
                    <Image
                      src={item.user.image}
                      alt=""
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}>{formatDate(item.createdAt)}</span>
                  </div>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </div>

  );
};

export default Comments;
