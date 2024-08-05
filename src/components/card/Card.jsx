import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-GB').replace(/\//g, '.');

  return (
    <div className={styles.container} key={key}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
          {item.additionalImages && item.additionalImages.length > 0 && (
            <div className={styles.imageCounter}>+{item.additionalImages.length}</div>
          )}
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{formattedDate} - </span>
          <span className={styles.category}>{item.catSlug}<br />{item.user.name}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0,60) }}/>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;