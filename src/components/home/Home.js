import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import HomeBanner from "./HomeBanner";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

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
