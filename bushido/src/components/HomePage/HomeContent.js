import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import cookies from "js-cookie";
import { Link } from "react-router-dom";

import GET_ANIMES from "../../graphql/Queries/getAnimes.js";
import GET_MANGAS from "../../graphql/Queries/getMangas.js";

import SearchIcon from "@material-ui/icons/Search";

const lang = cookies.get("i18next") || "en";

const HomeContent = (props) => {
  const { t } = useTranslation();
  const isAnime = props.content;

  const handleClick_anime = () => {
    props.setContent(true);
  };
  const handleClick_manga = () => {
    props.setContent(false);
  };

  return (
    <main className=" grid grid-cols-5 auto-rows-auto justify-center gap-12 px-8 mb-6">
      <div className="col-start-1 col-end-2 text-white flex items-end ml-12">
        <select
          name="genres"
          className="rounded w-32 h-8 bg-secondary-400 border-2 border-primary-400"
        >
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Shounen">Shounen</option>
          <option value="Comedy">Comedy</option>
        </select>
      </div>
      <div className="col-start-2 col-end-5 py-8 flex items-start justify-center">
        <button
          onClick={handleClick_anime}
          className={isAnime ? "tabs-active" : "tabs"}
        >
          Animes
        </button>
        <button
          onClick={handleClick_manga}
          className={isAnime ? "tabs" : "tabs-active"}
        >
          Mangas
        </button>
      </div>

      <form className="col-start-5 col-end-6 mr-4 flex items-end justify-end">
        <input
          type="search"
          placeholder={t("search_anime")}
          className="w-60 h-8 px-1 bg-secondary-400 text-white rounded rounded-r-none outline-none border-t-2 border-b-2 border-l-2 border-primary-400"
        ></input>
        <button className="bg-primary-400 rounded text-white font-bold hover:bg-primary-300 transition-all ease-linear duration-200 rounded-l-none px-4 h-8">
          <SearchIcon fontSize="small" />
        </button>
      </form>

      {isAnime && <AnimeContent />}
      {!isAnime && <MangaContent />}
    </main>
  );
};

const AnimeContent = () => {
  const { loading, error, data } = useQuery(GET_ANIMES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An Error has ocurred</div>;

  const animeData = data.animes;

  return animeData.map((anime) => {
    return (
      <div key={anime.slug} className="card">
        <Link to={`/anime/${anime.slug}`}>
          <img
            src={anime.imageCover}
            alt={`${anime.titles[lang]} Cover`}
            className="card-img"
          />
        </Link>
      </div>
    );
  });
};

const MangaContent = () => {
  const { loading, error, data } = useQuery(GET_MANGAS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An Error has ocurred</div>;

  const mangaData = data.mangas;

  return mangaData.map((manga) => {
    return (
      <div key={manga.slug} className="card">
        <Link to={`/manga/${manga.slug}`}>
          <img
            src={manga.imageCover}
            alt={`${manga.titles[lang]} Cover`}
            className="card-img"
          />
        </Link>
      </div>
    );
  });
};

export default HomeContent;
