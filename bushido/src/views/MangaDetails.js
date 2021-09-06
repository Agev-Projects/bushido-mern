import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

import GET_MANGA_SLUG from "../graphql/Queries/getMangaSlug.js";
import GET_LISTS from "../graphql/Queries/getLists.js";
import ADD_MANGA from "../graphql/Mutations/addManga.js";
import REMOVE_MANGA from "../graphql/Mutations/removeManga.js";

import HomeNav from "../components/HomePage/HomeNav";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import LabelIcon from "@material-ui/icons/Label";

const AnimeDetails = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [added, setAdded] = useState(false);
  const { loading, error, data } = useQuery(GET_MANGA_SLUG, {
    variables: { slug },
  });
  const {
    loading: loadingList,
    error: errorList,
    data: dataList,
  } = useQuery(GET_LISTS);

  const [add, { loadingAdd }] = useMutation(ADD_MANGA, {
    refetchQueries: [GET_LISTS, "getLists"],
  });

  const [remove, { loadingRemove }] = useMutation(REMOVE_MANGA, {
    refetchQueries: [GET_LISTS, "getLists"],
  });

  useEffect(() => {
    if (loading) return <div>Loading...</div>;
    if (error) {
      console.log(error);
      return <div>An Error has ocurred</div>;
    }
    if (data) {
      if (loadingList) return <div>Loading...</div>;
      if (errorList) return <div>An Error has ocurred</div>;
      if (dataList) {
        let list = dataList.mangalist.filter((value) => {
          return value.slug === mangaData.slug;
        });

        if (list.some((value) => value.slug === mangaData.slug)) {
          setAdded((added) => !added);
        }
        console.log(added);
        console.log(list);
      }
    }
  }, [dataList, loadingList, errorList, data, loading, error]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An Error has ocurred</div>;

  const mangaData = data.manga_slug;
  const lang = cookies.get("i18next") || "en";

  const handleAdd = async (id) => {
    const response = await add({
      variables: { id },
    });
    console.log(loadingAdd);
    console.log(response);
  };

  const handleRemove = async (id) => {
    const response = await remove({
      variables: { id },
    });
    console.log(loadingRemove);
    setAdded(false);

    console.log(response);
  };

  const handleClick = () => {
    let id = mangaData.id;

    if (!added) {
      handleAdd(id);
    } else {
      handleRemove(id);
    }
  };

  return (
    <React.Fragment>
      <HomeNav />
      <div className="w-full h-screen-70 relative">
        <div className="absolute top-0 left-0 bg-gradient-to-t from-secondary-500 to-transparent w-full h-full"></div>
        <img
          src={mangaData.imageHero}
          alt="featured anime"
          className="w-full h-full object-cover z-0"
        ></img>
        <div className="absolute top-36 left-10 w-1/2 flex flex-col">
          <img src={mangaData.imageTitle} alt="title" className="w-1/2" />

          <ul className="flex ml-4">
            {mangaData.genres[lang].map((genre) => {
              return (
                <li
                  key={genre}
                  className="text-white font-custom text-semibold  mr-4 flex align-center"
                >
                  <LabelIcon className="text-primary-400" /> {genre}
                </li>
              );
            })}
          </ul>

          <p className="text-white font-custom">
            {mangaData.descriptions[lang]}
          </p>

          <div title="buttons" className="mt-4 flex">
            <button className="btn-primary w-auto px-4 h-10 mr-4 flex items-center justify-center">
              <PlayArrowIcon /> <span>{t("read_preview")}</span>
            </button>
            <button
              onClick={handleClick}
              className="btn-add rounded-full w-auto px-2 flex items-center justify-center"
            >
              {added ? <CheckIcon /> : <AddIcon />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="card w-1/5 ml-6 my-6">
          <img
            src={mangaData.imageCover}
            alt="manga preview"
            className="card-img w-full"
          />
          <p className="text-center font-custom">
            {mangaData.titles[lang]} - Preview
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AnimeDetails;
