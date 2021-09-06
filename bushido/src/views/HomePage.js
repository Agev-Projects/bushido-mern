import React, { useState } from "react";
import HomeNav from "../components/HomePage/HomeNav";
import HomeHero from "../components/HomePage/HomeHero";
import HomeContent from "../components/HomePage/HomeContent";

const HomePage = () => {
  const [isAnime, setIsAnime] = useState(true);

  return (
    <React.Fragment>
      <HomeNav />
      <HomeHero content={isAnime} />
      <HomeContent content={isAnime} setContent={setIsAnime} />
    </React.Fragment>
  );
};

export default HomePage;
