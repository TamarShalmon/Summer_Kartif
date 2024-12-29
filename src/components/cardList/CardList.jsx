import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import prisma from "@/utils/connect";
import Link from "next/link";

const CardList = async ({ page, cat, region, professional }) => {
  const POST_PER_PAGE = 9;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
      ...(region && { region }),
      ...(professional && { professional }), 
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

    return (
      <div className={styles.container}>
        <p className={styles.title}>המלצות אחרונות</p>
        <div className={styles.posts}>
          {posts && posts.length > 0 ? (
            posts.map((item) => (
              <Card item={item} key={item.id} />
            ))
          ) : (
            <div className={styles.div}>כרגע אין המלצות להצגה, תהיו הראשונים לפרסם!
              <br />  <Link href="/write" className={styles.button} >פרסום המלצה</Link>
            </div>
          )}
        </div>
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} cat={cat} region={region} professional={professional} />
      </div>
    );
  } catch (err) {
    // console.log(err);
    return <div>Something went wrong!</div>;
  }
};

export default CardList;
