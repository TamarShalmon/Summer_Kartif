"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Fredoka } from 'next/font/google';
import Modal from "../../modals/confirmModal/Modal"; 

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-fredoka',
});

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
  const { status, data: session } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  // console.log("Client postSlug:", postSlug);
  // console.log("Fetched comments:", data);

  const [desc, setDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const handleSubmit = async () => {
    // console.log("Submitting comment:", { desc, postSlug });
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
    setDesc("");
  };

  const handleDeleteClick = (commentId) => {
    // console.log("Opening modal for comment:", commentId);
    setCommentToDelete(commentId);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (commentToDelete) {
      try {
        const res = await fetch(`/api/comments?id=${commentToDelete}`, {
          method: "DELETE",
        });
        if (res.ok) {
          mutate(); // רענון הנתונים לאחר מחיקה
          setIsModalOpen(false); // סגירת המודל לאחר המחיקה
          setCommentToDelete(null); // איפוס ה-state
        } else {
          console.error("Failed to delete comment");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
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

        {session?.user?.approved ? (
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
            : data?.map((item) => (
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
                {session?.user?.email === item.user.email && (
                  <button onClick={() => handleDeleteClick(item.id)} className={styles.deleteButton}>
                    מחק תגובה
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}  
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          message="בטוחים שברצונכם למחוק תגובה זו?"
        />
      )}
    </div>
  );
};

export default Comments;
