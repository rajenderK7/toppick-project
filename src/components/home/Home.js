import CategoryCard from "./CategoryCard";
import HomeBanner from "./HomeBanner";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <CategoryCard
        category="books"
        isMovie={false}
        title="Books"
        desc="Top rated book suggestions curated for you"
      ></CategoryCard>
      <CategoryCard
        category="movies"
        isMovie={true}
        title="Movies"
        desc="Top rated movie suggestions curated for you"
      ></CategoryCard>
    </div>
  );
};

export default Home;
