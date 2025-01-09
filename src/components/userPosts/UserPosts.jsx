"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./userPosts.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import Link from "next/link";
import { Fredoka } from 'next/font/google'
import Modal from "../../modals/confirmModal/Modal";

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-fredoka',
})

const fetchData = async (page) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/userPosts?page=${page}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("נכשל בטעינת הנתונים");
  }

  return res.json();
};

const UserPosts = ({ page, post }) => {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);


  useEffect(() => {
    const fetchPosts = async () => {
      const { posts, count } = await fetchData(page);
      setPosts(posts);
      setCount(count);
    };

    fetchPosts();
  }, [page]);

  const POST_PER_PAGE = 9;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  const handleDeleteClick = (slug) => {
    setPostToDelete(slug);
    setIsModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      try {
        const res = await fetch(`/api/posts/${encodeURIComponent(postToDelete)}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`Failed to delete the post: ${errorData.message}`);
        }

        const data = await res.json();
        console.log(data.message); // Log the success message

        router.refresh("/");
        setPosts(posts.filter(post => post.slug !== postToDelete));
        setIsModalOpen(false);
        setPostToDelete(null);
      } catch (error) {
        console.error("Error deleting post:", error);
        alert(`אירעה שגיאה במחיקת הפוסט: ${error.message}`);
      }
    }
  };


  return (
    <div className={fredoka.className}>
      <div className={styles.container}>
        <p className={styles.title}>ההמלצות שלי</p>
        <div className={styles.posts}>
          {posts && posts.length > 0 ? (
            posts.map((item) => (
              <div key={item.id} className={styles.postWrapper}>
                <Card item={item} key={item.id} />
                <Link href={`/edit-post/${item.slug}`} className={`${styles.button} ${styles.editButton}`}>
                  עריכה
                </Link>
                <button
                  onClick={() => handleDeleteClick(item.slug)}
                  className={`${styles.button} ${styles.deleteButton}`}
                >
                  מחיקה
                </button>
              </div>
            ))
          ) : (
            <p>אין המלצות להצגה, או שהן בטעינה...</p>
          )}
        </div>
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="בטוחים שברצונכם למחוק פוסט זה?"
      />
    </div>
  );
};

export default UserPosts;
