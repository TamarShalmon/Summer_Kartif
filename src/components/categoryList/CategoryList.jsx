"use client"
import React, { useEffect, useState } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
};

const CategoryList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData()
      .then((data) => {
        console.log("Fetched data:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error loading categories</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(data)) {
    return <div>Data is not an array</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>קטגוריות</h1>
      <div className={styles.categories}>
        {data.map((item, index) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={`${item._id}-${index}`}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
