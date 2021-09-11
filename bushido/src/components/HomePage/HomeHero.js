import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import cookies from "js-cookie";

import GET_ANIMES_HERO from "../../graphql/Queries/getAnimesHero.js";
import GET_MANGAS_HERO from "../../graphql/Queries/getMangasHero.js";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import InfoIcon from "@material-ui/icons/Info";
import Loading from "../States/Loading";

const HomeHero = (props) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const isAnime = props.content;
  const { loading, error, data } = useQuery(GET_ANIMES_HERO);
  const {
    loading: loadingM,
    error: errorM,
    data: dataM,
  } = useQuery(GET_MANGAS_HERO);
  useEffect(() => {
    let autoSlider = setTimeout(() => {
      if (slideIndex !== 3) {
        setSlideIndex(slideIndex + 1);
      } else {
        setSlideIndex(1);
      }
    }, 9000);
    return () => clearTimeout(autoSlider);
  }, [slideIndex]);

  if (loading || loadingM)
    return (
      <div className="centered-loader">
        <Loading stroke="#EA2C59" />
      </div>
    );
  if (error || errorM) return <div>An Error has ocurred</div>;
  const contentData = isAnime ? data.animes_hero : dataM.mangas_hero;
  const lang = cookies.get("i18next") || "en";

  const handleClickDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <section>
      <div className="relative">
        {contentData.map((content, index) => {
          return (
            <HeroContent
              key={content.titles[lang]}
              position={slideIndex === index + 1 ? "hero-active" : "hero"}
              image={content.imageHero}
              imageTitle={content.imageTitle}
              description={content.descriptions[lang]}
              info={content.slug}
              content={isAnime}
            />
          );
        })}

        <div className="absolute z-20 bottom-0 right-0 sm:bottom-10  sm:right-10 flex ">
          {Array.from({ length: 3 }).map((x, index) => (
            <div
              key={index}
              onClick={() => handleClickDot(index + 1)}
              className={
                slideIndex === index + 1 ? "dot-active tra" : "dot tra"
              }
            >
              {" "}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HeroContent = ({
  position,
  image,
  imageTitle,
  description,
  info,
  content,
}) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className={`w-full h-screen-70 ${position} tra relative`}>
        <div className="absolute top-0 left-0 bg-gradient-to-t from-secondary-500 to-transparent w-full h-full"></div>
        <img
          src={image}
          alt="featured anime"
          className=" w-screen xs:w-full h-full xs:object-cover z-0"
        ></img>
        <div
          title="info"
          className="absolute transform -translate-y-16 sm:-translate-y-0 top-40 left-10 w-1/2 sm:w-1/3 flex flex-col"
        >
          <img
            src={imageTitle}
            alt="anime title"
            className="w-7/12 lg:w-3/5 h-auto pb-1"
          ></img>
          <div
            title="description"
            className="font-custom font-bold text-xs lg:text-sm text-white"
          >
            <span className="inline">{description}</span>
          </div>
          <div title="buttons" className="mt-4 sm:flex">
            <Link to={content ? `/watch/${info}` : `/manga/${info}`}>
              <button className="btn-primary w-3/4 text-xs sm:text-base sm:w-auto px-4 h-10 mb-4 sm:mb-0 mr-4 flex items-center justify-center">
                {content ? (
                  <PlayArrowIcon className="text-xs sm:text-base" />
                ) : (
                  <ImportContactsIcon className="pr-2" />
                )}{" "}
                <span> {content ? t("play_button") : t("read_button")}</span>
              </button>
            </Link>
            <Link to={`/${content ? "anime" : "manga"}/${info}`}>
              <button className="btn-secondary text-xs lg:text-base w-auto px-2 h-10 flex items-center justify-center">
                <InfoIcon /> <span className="px-1">{t("more_button")}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeHero;
