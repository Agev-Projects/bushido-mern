import i18next from "i18next";
import { useTranslation } from "react-i18next";

import bushidologo from "../../assets/images/bushidologo.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";

const LandingFooter = () => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  return (
    <footer className="h-1/2 bg-secondary-500 flex justify-center">
      <div className="container flex flex-col justify-center items-center p-20">
        <img src={bushidologo} alt="bushido logo footer" className="w-32"></img>
        <div className="text-gray-600">
          <a
            href="https://github.com/Agev-Projects"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300 mr-4"
          >
            <GitHubIcon fontSize="large" />
          </a>
          <a
            href="https://www.linkedin.com/in/agev/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300 mr-4"
          >
            <LinkedInIcon fontSize="large" />
          </a>
          <a
            href="https://twitter.com/AgevDaniel"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300"
          >
            <TwitterIcon fontSize="large" />
          </a>
        </div>
        <p className=" text-gray-600 pt-4">
          &copy;2021{" "}
          <a
            href="https://agev-portfolio.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Agev
          </a>
          , Bushido! All Rights reserved.
        </p>

        <select
          onChange={(e) => handleChange(e)}
          className="text-white bg-secondary-600 rounded border-2 border-primary-400 p-4 mt-8"
        >
          <option>{t("select_language")}</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="pt">Português</option>
        </select>
      </div>
    </footer>
  );
};

export default LandingFooter;
