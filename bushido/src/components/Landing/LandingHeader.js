import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import bushidologo from "../../assets/images/bushidologo.png";

const LandingHeader = () => {
  const [navScroll, setNavScroll] = useState(false);
  const { t } = useTranslation();

  const handleScroll = () => {
    if (window.scrollY >= 400) {
      setNavScroll(true);
    } else {
      setNavScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      onScroll={handleScroll}
      className={
        navScroll
          ? "flex justify-between items-center w-screen fixed bg-secondary-400 z-10 tra"
          : "flex justify-between items-center w-screen fixed bg-secondary-400 bg-opacity-0 z-10 tra"
      }
    >
      <img
        src={bushidologo}
        alt="header logo"
        className={
          navScroll
            ? "ml-4 w-32 h-auto tra"
            : "ml-4 w-32 h-auto opacity-0 invisible tra  "
        }
      ></img>

      <div className="mr-4">
        <Link
          to="/signup"
          className={
            navScroll
              ? "btn-primary text-lg mr-4 py-2 px-4 tra"
              : "btn-primary text-lg mr-4 py-2 px-4 opacity-0 invisible tra"
          }
        >
          {t("register")}
        </Link>
        <Link to="/login" className="btn-secondary text-base mr-5 py-3 px-6">
          {t("login")}
        </Link>
      </div>
    </header>
  );
};

export default LandingHeader;
