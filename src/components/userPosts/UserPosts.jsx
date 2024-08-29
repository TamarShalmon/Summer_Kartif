"use client"
import React, { useState, useEffect } from "react";
import styles from "./userPosts.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import Link from "next/link";

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
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);



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

  const handleDelete = async (slug) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק פוסט זה?")) {
      try {
        const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`Failed to delete the post: ${errorData.message}`);
        }

        setPosts(posts.filter(post => post.slug !== slug));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert(`אירעה שגיאה במחיקת הפוסט: ${error.message}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ההמלצות שלי</h1>
      <div className={styles.posts}>
        {posts && posts.length > 0 ? (
          posts.map((item) => (
            <div key={item.id} className={styles.postWrapper}>
              <Card item={item} className={styles.post} />
              <Link href={`/edit-post/${item.slug}`}>Edit</Link>
              <button onClick={() => handleDelete(item.slug)}>Delete</button>
            </div>
          ))
        ) : (
          <p>אין המלצות להצגה, או שהן בטעינה...</p>
        )}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default UserPosts;
