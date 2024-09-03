import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";
import RegionFilter from "@/components/regionFilter/RegionFilter";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat, region } = searchParams;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat}</h1>
      <RegionFilter initialRegion={region} />
      <CardList page={page} cat={cat} region={region} />
    </div>
  );
};

export default BlogPage;