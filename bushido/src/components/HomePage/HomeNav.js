import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useContext } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../context/Authentication";
import LOGOUT from "../../graphql/Mutations/logout";
import ChangePicModal from "../User/ChangePicModal";
import HomeIcon from "@material-ui/icons/Home";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import bushidologo from "../../assets/images/bushidologo.png";

const HomeNav = () => {
  const [navScroll, setNavScroll] = useState(false);
  const [hoverProfile, setHoverProfile] = useState(false);
  const [modal, setModal] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const handleScroll = () => {
    if (window.scrollY >= 400) {
      setNavScroll(true);
    } else {
      setNavScroll(false);
    }
  };

  const handleMouseOver = () => {
    setHoverProfile(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <header
        onScroll={handleScroll}
        className={
          navScroll
            ? "fixed w-screen bg-secondary-400 bg-opacity-100 z-40"
            : "fixed w-screen bg-secondary-400 bg-opacity-0 z-40"
        }
      >
        <nav className="flex items-center justify-between  bg-gradient-to-b from-secondary-400 to-transparent">
          <div className="text-white flex items-center">
            <Link to="/home">
              <img
                src={bushidologo}
                alt="header logo"
                className="ml-4 mr-6 w-32 h-auto"
              ></img>
            </Link>

            <span className="group mr-4 text-sm font-custom px-1">
              <Link to="/home">
                <HomeIcon fontSize="medium" style={{ paddingBottom: "2px" }} />
                <p className="px-1 inline-block border-white border-solid border-b-2 border-opacity-0 group-hover:border-opacity-100">
                  {t("nav_home")}
                </p>
              </Link>
            </span>

            <span className="group text-sm font-custom px-1">
              <Link to="/list">
                <WatchLaterIcon
                  fontSize="medium"
                  style={{ paddingBottom: "2px" }}
                />
                <p className="px-1 inline-block border-white border-solid border-b-2 border-opacity-0 group-hover:border-opacity-100">
                  {t("nav_list")}
                </p>
              </Link>
            </span>
          </div>

          <div
            onMouseOver={handleMouseOver}
            className="relative rounded-full text-white mr-12 flex items-center justify-center w-12 h-12"
          >
            <img
              src={user.user.profilePic}
              alt="Profile"
              className={
                hoverProfile
                  ? "profile  border-2 border-white border-opacity-100"
                  : "profile  border-2 border-white border-opacity-0 transition-all duration-300 hover:border-opacity-100"
              }
            ></img>
            {hoverProfile && (
              <UserModal
                profile={setHoverProfile}
                user={user}
                logout={setUser}
                modal={setModal}
              />
            )}
          </div>
        </nav>
      </header>
      {modal && (
        <ChangePicModal
          open={setModal}
          position={{ x: "full", y: "8" }}
          sign={false}
        />
      )}
    </React.Fragment>
  );
};

const UserModal = (props) => {
  const { t } = useTranslation();
  const [logout, { error }] = useMutation(LOGOUT);
  const client = useApolloClient();
  const history = useHistory();

  if (error) {
    console.log(error);
    return <div className="text-white">Error</div>;
  }

  const { username } = props.user.user;

  const handleMouseLeave = () => {
    props.profile(false);
  };
  const handleLogoutClick = async () => {
    const response = await logout();
    props.logout(null);
    client.clearStore();
    client.resetStore();
    history.push("/");
    console.log(response);
  };

  const handleChangeClick = () => {
    props.modal(true);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className="absolute rounded w-40 h-48 bg-secondary-300 z-0 top-0 right-0 -mt-1.5 -mr-1.5 divide-y divide-white px-2"
    >
      <div className="mt-4 p-1 pl-2">
        <span className="text-sm font-custom">{username}</span>
      </div>
      <ul className="mt-2 p-2">
        <li
          onClick={handleChangeClick}
          className="mb-2 cursor-pointer tra hover:text-primary-200"
        >
          {t("change_picture")}
        </li>
        <li
          onClick={handleLogoutClick}
          className="cursor-pointer tra hover:text-primary-200"
        >
          {t("log_out")}
        </li>
      </ul>
    </div>
  );
};

export default HomeNav;
