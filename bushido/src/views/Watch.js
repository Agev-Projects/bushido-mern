import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";

import GET_ANIME_SLUG from "../graphql/Queries/getAnimeSlug.js";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Loading from "../components/States/Loading";

const Watch = () => {
  const { slug } = useParams();
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_ANIME_SLUG, {
    variables: { slug },
  });

  if (loading)
    return (
      <div className="centered-loader">
        <Loading stroke="#EA2C59" />
      </div>
    );
  if (error) return <div>An Error has ocurred</div>;

  const animeData = data.anime_slug;

  return (
    <React.Fragment>
      <div
        onClick={() => history.go(-1)}
        className="absolute top-2 left-0 z-100 pl-4 text-white bg-secondary-300 rounded cursor-pointer"
      >
        <ArrowBackIosIcon style={{ fontSize: 44 }} />
      </div>
      <iframe
        className="w-screen h-screen z-0"
        src={`${animeData.trailer}?&autoplay=1`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </React.Fragment>
  );
};

export default Watch;
