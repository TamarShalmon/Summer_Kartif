
import Menu from "@/components/Menu/Menu";
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

  const formattedDate = new Date(data.createdAt)
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.cat}>{data?.catSlug}</div>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>
                {data?.user?.name || "Unknown User"}
              </span>
              <span className={styles.date}>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            {data?.desc ?
              data.desc.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
              :
              <p>No description available.</p>
            }
          </div>
          {data?.mainImage && (
            <div className={styles.imageContainer}>
              <Image src={data.mainImage} alt="" fill className={styles.image} />
            </div>
          )}
          {data?.additionalImages && data.additionalImages.length > 0 && (
            <div className={styles.additionalImagesContainer}>
              {data.additionalImages.map((img, index) => (
                <div key={index} className={styles.additionalImagesContainer}>
                  <Image src={img} alt={`Additional Image ${index + 1}`} fill className={styles.additionalImages} />
                </div>
              ))}
            </div>
          )}
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        {/* <Menu /> */}
      </div>
    </div>
  );
};


export default SinglePage;