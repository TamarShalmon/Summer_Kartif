import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";
import Filter from "@/components/filter/Filter";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat, region, professional } = searchParams;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat}</h1>
      <Filter
        initialRegion={region}
        initialProfessional={professional}
        cat={cat}
      />
      <CardList
        page={page}
        cat={cat}
        region={region}
        professional={professional}
      />
    </div>
  );
};

export default BlogPage;
