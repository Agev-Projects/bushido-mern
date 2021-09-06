import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import HomeNav from "../components/HomePage/HomeNav";
import GET_LISTS from "../graphql/Queries/getLists";

const List = () => {
  const { loading, error, data } = useQuery(GET_LISTS);
  const { t } = useTranslation();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const animeList = data.animelist;
  const mangaList = data.mangalist;
  const lang = cookies.get("i18next") || "en";

  return (
    <React.Fragment>
      <HomeNav />
      <div className="grid grid-cols-5 auto-rows-auto gap-12">
        <h1 className="text-white text-2xl font-semibold font-custom ml-4  mt-24 col-span-2">
          {t("my_anime_list")}
        </h1>
        <div className="col-span-5 text-white flex items-end ml-12">
          {animeList.map((anime) => {
            return (
              <div key={anime.slug} className="card  w-52 mr-4">
                <Link to={`/anime/${anime.slug}`}>
                  <img
                    src={anime.imageCover}
                    alt={`${anime.titles[lang]} Cover`}
                    className="card-img"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-5 auto-rows-auto gap-12">
        <h1 className="text-white text-2xl font-semibold font-custom ml-4  mt-24 col-span-2">
          {t("my_manga_list")}
        </h1>
        <div className="col-span-5 text-white flex items-end ml-12">
          {mangaList.map((manga) => {
            return (
              <div key={manga.slug} className="card  w-52 mr-4">
                <Link to={`/manga/${manga.slug}`}>
                  <img
                    src={manga.imageCover}
                    alt={`${manga.titles[lang]} Cover`}
                    className="card-img"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default List;
