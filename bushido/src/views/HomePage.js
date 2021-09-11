import React, { useState } from "react";
import HomeNav from "../components/HomePage/HomeNav";
import HomeNavResponsive from "../components/HomePage/HomeNavResponsive";
import HomeHero from "../components/HomePage/HomeHero";
import HomeContent from "../components/HomePage/HomeContent";
import { useMediaQuery } from "@material-ui/core";

const HomePage = () => {
  const [isAnime, setIsAnime] = useState(true);
  const isResponsive = useMediaQuery("(max-width:765px)");

  return (
    <React.Fragment>
      {isResponsive ? <HomeNavResponsive /> : <HomeNav />}
      <HomeHero content={isAnime} />
      <HomeContent content={isAnime} setContent={setIsAnime} />
    </React.Fragment>
  );
};

export default HomePage;
