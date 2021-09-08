import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";

import GET_USER from "../../graphql/Queries/getUser.js";
import UPDATE_PIC from "../../graphql/Mutations/updatePic.js";

import CloseIcon from "@material-ui/icons/Close";
import IMAGES from "./profilePics.js";

const ChangePicModal = (props) => {
  const [isSign, setIsSign] = useState(props.sign);
  const [updatePic, { data }] = useMutation(UPDATE_PIC, {
    refetchQueries: [GET_USER, "getUser"],
  });
  const { t } = useTranslation();

  const handleSetPic = (e) => {
    props.setPic(e.target.getAttribute("src"));
    props.open(false);
  };

  const handleSetPicMutation = async (e) => {
    let pic = e.target.getAttribute("src");
    const response = await updatePic({
      variables: { pic },
    });
    props.open(false);
  };

  const handleCloseClick = () => {
    props.open(false);
  };

  return (
    <React.Fragment>
      <div
        onClick={handleCloseClick}
        className="fixed w-screen h-screen bg-black bg-opacity-60 z-30"
      ></div>
      <div
        className={isSign ? `fixed transform translate-x-0 translate-y-0 shadow-lg-white bg-secondary-300 rounded-lg w-1/3 h-3/4 z-50` : `fixed transform translate-x-full translate-y-8 shadow-lg-white bg-secondary-300 rounded-lg w-1/3 h-3/4 z-50`}
      >
        <div className="flex justify-between p-4">
          <p className="text-primary-400 text-2xl font-custom">
            {t("choose_pic")}
          </p>
          <CloseIcon
            onClick={handleCloseClick}
            className="cursor-pointer text-primary-400 hover:text-primary-200"
          />
        </div>

        <div className="grid grid-cols-3 gap-8 p-4 auto-rows-fr">
          {IMAGES.map((image) => {
            return (
              <div
                onClick={
                  isSign
                    ? (e) => handleSetPic(e)
                    : (e) => handleSetPicMutation(e)
                }
                key={image.id}
                className="rounded-full w-28 h-28 bg-white bg-opacity-0 transition-all duration-300 hover:bg-opacity-100 "
              >
                <img
                  src={image.image}
                  alt={image.alt}
                  className="rounded-full w-full h-full border-4 border-white border-opacity-0 transition-all duration-300 transform hover:border-opacity-100 hover:scale-105"
                />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangePicModal;
