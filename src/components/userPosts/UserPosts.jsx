"use client"
import React, { useState, useEffect } from "react";
import styles from "./userPosts.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";

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

const UserPosts = ({ page }) => {
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ההמלצות שלי</h1>
      <div className={styles.posts}>
        {posts && posts.length > 0 ? (
          posts.map((item) => (
            <Card item={item} key={item.id} className={styles.post} />
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
