import FilteredCategories from "../Pages/Categores";
import Popularposts from "../Pages/Popularposts";
import Slider from "../Pages/Slider";
import NewPost from "../Pages/Newposts";
import Latesvedios from "../Pages/Latesvedios";
import Trendyvedios from "../Pages/Trendyvedios";
import Topposts from "../Pages/Topposts";

function Home() {
  return (
    <>
      <div className="container">
        <FilteredCategories />
        <Slider />
        <Popularposts />
        <NewPost />
      </div>
      <Latesvedios />
      <div className="container">
        <Trendyvedios />
        <Topposts />
      </div>
    </>
  );
}

export default Home;
