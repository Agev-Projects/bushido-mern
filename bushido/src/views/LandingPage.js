import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import landingImg from "../assets/images/banner.png";
import bushidologo from "../assets/images/bushidologo.png";
import mangacover from "../assets/images/mangacover.png";
import tv from "../assets/images/tv.png";
import LandingHeader from "../components/Landing/LandingHeader";
import LandingFAQ from "../components/Landing/LandingFAQ";
import LandingFooter from "../components/Landing/LandingFooter";

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <LandingHeader />
      <main className="flex flex-col items-center">
        <div className="relative h-96 lg:h-screen mb-8">
          <img
            src={landingImg}
            alt="bushidoLanding"
            className="object-cover h-full xs:h-auto w-full"
          ></img>

          <div className="absolute top-20 lg:top-100 ml-4">
            <img
              src={bushidologo}
              alt="bushido logo"
              className="w-64 h-auto"
            ></img>

            <h1 className="text-white text-2xl lg:text-4xl font-semibold font-custom w-3/5 ml-4">
              {t("welcome")}
            </h1>

            <div className="flex ml-4 mt-12 mb-8 pt-8">
              <Link to="/signup">
                <button className="btn-primary text-lg w-48 sm:w-96 h-16">
                  {t("register")}!
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center mt-64">
          <div className="px-4 lg:px-0 mb-12 lg:ml-4">
            <h2 className="text-white text-4xl text-semibold font-custom">
              {t("welcome_enjoy")}
            </h2>
            <p className="text-gray-200 font-custom text-md pt-2">
              {t("enjoy_sub")}
            </p>
          </div>
          <img src={tv} alt="Anime on TV" width="640" height="480"></img>
        </div>
        <div className="flex flex-col lg:flex-row  items-center mb-64 lg:mb-0 mt-64">
          <img
            src={mangacover}
            alt="Manga on Monitor"
            width="640"
            height="480"
          ></img>
          <div className="ml-4">
            <h2 className="text-white text-4xl text-semibold font-custom">
              {t("welcome_read")}
            </h2>
            <p className="text-gray-200 font-custom text-md pt-2">
              {t("read_sub")}
            </p>
          </div>
        </div>
        <div className="w-full bg-secondary-300 h-3 my-6"></div>
        <LandingFAQ />
        <LandingFooter />
      </main>
    </React.Fragment>
  );
};

export default LandingPage;
