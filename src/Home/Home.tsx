import React from "react";
import FilteredCategories from "../Pages/Categores";
import Popularposts from "../Pages/Popularposts";
import Calendar from "./../Pages/Calendar";
import Slider from "../Pages/Slider";
import NewPost from "../Pages/Newposts";
import Latesvedios from "../Pages/Latesvedios";
import Trendyvedios from "../Pages/Trendyvedios";
import Weather from "../Pages/Weather";
import Topposts from "../Pages/Topposts";

function Home() {
  return (
    <>
      <div className="container">
        <FilteredCategories />
        <Slider />
        <Popularposts />
        {/* <Calendar /> */}
        <NewPost />
      </div>
      <Latesvedios />
      <div className="container">
        <Trendyvedios />
        {/* <Weather /> */}
        <Topposts />
      </div>
    </>
  );
}

export default Home;
