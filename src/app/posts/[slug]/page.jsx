
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const getData = async (slug) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;
  const data = await getData(slug);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <div className={styles.user}>
            {/* {data?.user?.image && (
              <div className={styles.userImageContainer}>
              <Image
              src={data.user.image}
              alt=""
              fill
              className={styles.avatar}
              />
              </div>
              )} */}
            <div className={styles.userTextContainer}>
              <div className={styles.cat}><strong>{data?.catSlug}</strong>{" | "}{data?.region}</div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.title}>{data?.title}</p>
      <span className={styles.username}>
        {data?.user?.name || "Unknown User"}{" "}
      </span>
      <span className={styles.date}>|{" "}{formatDate(data.createdAt)}</span>
      <div className={styles.content}>
        <div className={styles.post}>
          {data?.difficulty && <div className={styles.description}><b>דרגת קושי, מתאים למשפחות:</b> {data.difficulty}</div>}
          {data?.duration && <div className={styles.description}><b>משך המסלול:</b> {data.duration}</div>}
          {data?.season && <div className={styles.description}><b>עונת הטיול:</b> {data.season}</div>}
          {data?.shadedSeating && <div className={styles.description}><b>מקומות ישיבה מוצלים:</b> {data.shadedSeating}</div>}
          {data?.waterDepth && <div className={styles.description}><b>עומק מים:</b> {data.waterDepth}</div>}
          {data?.recommendedGear && <div className={styles.description}><b>ציוד מומלץ:</b> {data.recommendedGear}</div>}
          {data?.entryFee && <div className={styles.description}><b>כניסה בתשלום:</b> {data.entryFee}</div>}
          {data?.parking && <div className={styles.description}><b>הסדרי חניה:</b> {data.parking}</div>}
          <div className={styles.description}>
            {data?.desc ?
              data.desc.split('\n').map((paragraph, index) => (
                <p className={styles.p} key={index}>{paragraph}</p>
              ))
              :
              <p>No description available.</p>
            }
          </div>
          {/* {data?.mainImage && (
            <div className={styles.imageContainer}>
              <Image src={data.mainImage} alt="" fill className={styles.image} />
            </div>
          )} */}
          {data?.additionalImages && data.additionalImages.length > 0 && (
            <div className={styles.additionalImagesContainer}>
              {data.additionalImages.map((img, index) => (
                <div key={index} >
                  <Image src={img} alt={`Additional Image ${index + 1}`} fill className={styles.additionalImages} />
                </div>
              ))}
            </div>
          )}


          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default SinglePage;