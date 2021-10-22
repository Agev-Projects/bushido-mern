import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import cookies from "js-cookie";
import { Link } from "react-router-dom";

import Loading from "../States/Loading";

const lang = cookies.get("i18next") || "en";

const SearchContent = ({
  query,
  content,
  contentSlug,
  search,
  searchContent,
  type,
}) => {
  const { loading, error, data } = useQuery(query, {
    variables: { [content]: searchContent },
  });

  useEffect(() => {
    if (searchContent === "" || searchContent.trim() === "") {
      return search(false);
    }
  }, [searchContent]);

  if (loading)
    return (
      <div className="centered-loader">
        <Loading stroke="#EA2C59" />
      </div>
    );
  if (error) return <div>An Error has ocurred</div>;

  console.log(data);

  const searchData = data[type];

  if (searchData.length <= 0) {
    search(false);
  }

  return searchData.map((data) => {
    return (
      <div key={data.slug} className="card">
        <Link to={`/${contentSlug}/${data.slug}`}>
          <img
            src={data.imageCover}
            alt={`${data.titles[lang]} Cover`}
            className="card-img"
          />
        </Link>
      </div>
    );
  });
};

export default SearchContent;
