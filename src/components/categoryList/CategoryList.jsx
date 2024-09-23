"use client"
import React, { useEffect, useState, useRef } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const CategoryList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const categoryListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        cache: "default", // You can also try "default" or "no-store"
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (categoryListRef.current) {
        const { bottom } = categoryListRef.current.getBoundingClientRect();
        setIsSticky(bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (error) return <div>Error loading categories</div>;
  if (!data) return <div>טוען קטגוריות...</div>;
  if (!Array.isArray(data)) return <div>Data is not an array</div>;

  return (
    <>
      <div className={styles.container} ref={categoryListRef}>
        <div className={styles.categories}>
          {data.map((item, index) => (
            <Link
              href={`/blog?cat=${item.slug}`}
              className={styles.category}
              key={`${item._id}-${index}`}
            >
              {item.img && (
                <Image
                  src={`${item.img}`}
                  alt=""
                  width={300}
                  height={200}
                  className={styles.image}
                />
              )}
              <span className={styles.categoryTitle}>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className={`${styles.stickyCategories} ${isSticky ? styles.visible : ''}`}>
        {data.map((item, index) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={styles.stickyCategory}
            key={`sticky-${item._id}-${index}`}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryList;