import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat}</h1>
        <CardList page={page} cat={cat}/>
    </div>
  );
};

export default BlogPage;
