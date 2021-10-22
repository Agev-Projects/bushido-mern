import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import cookies from "js-cookie";
import { Link } from "react-router-dom";

import SearchContent from "./SearchContent.js";

import GET_ANIMES from "../../graphql/Queries/getAnimes.js";
import GET_MANGAS from "../../graphql/Queries/getMangas.js";
import GET_ANIME_SEARCH from "../../graphql/Queries/getAnimeSearch.js";
import GET_MANGA_SEARCH from "../../graphql/Queries/getMangaSearch.js";
import GET_ANIME_GENRE from "../../graphql/Queries/getAnimeGenre.js";
import GET_MANGA_GENRE from "../../graphql/Queries/getMangaGenre.js";

import SearchIcon from "@material-ui/icons/Search";
import Loading from "../States/Loading";

const lang = cookies.get("i18next") || "en";

const HomeContent = (props) => {
  const { t } = useTranslation();
  const isAnime = props.content;
  const [search, setSearch] = useState(false);
  const [searchByGenre, setSearchByGenre] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleClick_anime = () => {
    props.setContent(true);
    setSearch(false);
  };
  const handleClick_manga = () => {
    props.setContent(false);
    setSearch(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue === "" || searchValue.trim() === "") {
      return setSearch(false);
    }
    setSearch(true);
  };

  const handleSearchByGenre = (value) => {
    if (value === "All") {
      return setSearchByGenre(false);
    }
    setSearchValue(value);
    setSearchByGenre(true);
  };

  return (
    <main className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-auto justify-center gap-12 px-8 mb-6">
      <div className="hidden md:flex col-start-1 col-end-2 text-white items-end md:ml-0 lg:ml-12">
        <select
          name="genres"
          className="rounded w-32 h-8 bg-secondary-400 border-2 border-primary-400"
          onChange={(e) => handleSearchByGenre(e.target.value)}
        >
          <option value="All">{t("genre_all")}</option>
          <option value="Action">{t("genre_action")}</option>
          <option value="Adventure">{t("genre_adventure")}</option>
          <option value="Shounen">{t("genre_shounen")}</option>
          <option value="Seinen">{t("genre_seinen")}</option>
          <option value="Drama">{t("genre_drama")}</option>
          <option value="School">{t("genre_school")}</option>
          <option value="Psychological">{t("genre_psychological")}</option>
          <option value="Fantasy">{t("genre_fantasy")}</option>
          <option value="Comedy">{t("genre_comedy")}</option>
          <option value="Superhero">{t("genre_superhero")}o</option>
          <option value="Samurai">{t("genre_samurai")}</option>
          <option value="Sci-fi">{t("genre_sci-fi")}</option>
          <option value="Mecha">{t("genre_mecha")}</option>
          <option value="Dark fantasy">{t("genre_darkfantasy")}</option>
          <option value="Supernatural">{t("genre_supernatural")}</option>
          {!isAnime && (
            <option value="Martial Arts">{t("genre_martialarts")}</option>
          )}
        </select>
      </div>
      <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3 lg:col-start-2 lg:col-end-5 py-8 flex items-start justify-center">
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
      <form
        id="search"
        className="fixed top-5 z-50 right-0 sm:right-10 md:z-0 md:static flex md:col-start-3 md:col-end-4 lg:col-start-5 lg:col-end-6 mr-4 items-end lg:justify-end"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="search"
          placeholder={t("search_anime")}
          className=" w-24 xs:w-32 md:ml-6 lg:w-60 h-8 px-1 bg-secondary-400 text-white rounded rounded-r-none outline-none border-t-2 border-b-2 border-l-2 border-primary-400"
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
        <button
          type="submit"
          className="bg-primary-400 rounded text-white font-bold hover:bg-primary-300 transition-all ease-linear duration-200 rounded-l-none px-4 h-8"
        >
          <SearchIcon fontSize="small" />
        </button>
      </form>
      {isAnime && !search && !searchByGenre && <AnimeContent />}
      {!isAnime && !search && !searchByGenre && <MangaContent />}

      {/* //Search by User Input */}

      {search && isAnime && (
        <SearchContent
          query={GET_ANIME_SEARCH}
          content="anime"
          contentSlug="anime"
          search={setSearch}
          searchContent={searchValue}
          setSearchContent={setSearchValue}
          type="anime_search"
        />
      )}
      {search && !isAnime && (
        <SearchContent
          query={GET_MANGA_SEARCH}
          content="manga"
          contentSlug="manga"
          search={setSearch}
          searchContent={searchValue}
          setSearchContent={setSearchValue}
          type="manga_search"
        />
      )}

      {/* //Search by Genre */}

      {searchByGenre && isAnime && (
        <SearchContent
          query={GET_ANIME_GENRE}
          content="genre"
          contentSlug="anime"
          search={setSearchByGenre}
          searchContent={searchValue}
          setSearchContent={setSearchValue}
          type="anime_genre"
        />
      )}
      {searchByGenre && !isAnime && (
        <SearchContent
          query={GET_MANGA_GENRE}
          content="genre"
          contentSlug="manga"
          search={setSearchByGenre}
          searchContent={searchValue}
          setSearchContent={setSearchValue}
          type="manga_genre"
        />
      )}
    </main>
  );
};

const AnimeContent = () => {
  const { loading, error, data } = useQuery(GET_ANIMES);

  if (loading)
    return (
      <div className="centered-loader">
        <Loading stroke="#EA2C59" />
      </div>
    );
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

  if (loading)
    return (
      <div className="centered-loader">
        <Loading stroke="#EA2C59" />
      </div>
    );
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
