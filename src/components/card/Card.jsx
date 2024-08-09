import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-GB').replace(/\//g, '.');

  return (
    <div className={styles.container} key={key}>
      {item.mainImage && (
        <div className={styles.imageContainer}>
          <Image src={item.mainImage} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {formattedDate} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}<br />{item.user.name}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h2 className={styles.title}>{item.title}</h2>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 60) }} />
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;