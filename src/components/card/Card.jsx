import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item }) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-GB').replace(/\//g, '.');

  return (
    <Link href={`/posts/${item.slug}`}>
      <div className={styles.container} >
        {item.mainImage && (
          <div className={styles.imageContainer}>
            <Image src={item.mainImage} alt="" fill className={styles.image} />
          </div>
        )}
        <div className={styles.textContainer}>
          <div className={styles.detail}>
            <span className={styles.date}>
              {formattedDate} - {item.user.name}
            </span>
            <span className={styles.category}>
              <br />
              {item.catSlug} | {item.professional}
              {item.professional && <br />}
              {item.region}
            </span>
          </div>
          <p className={styles.title}>{item.title}</p>
          {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
          <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 65) }} />
          <div className={styles.link}>
            קרא עוד...
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;