import { useTranslation } from "react-i18next";
import React, { useState, useContext } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../context/Authentication";
import LOGOUT from "../../graphql/Mutations/logout";
import ChangePicModal from "../User/ChangePicModal";

import HomeIcon from "@material-ui/icons/Home";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import bushidologo from "../../assets/images/bushidologo.png";

const HomeNavResponsive = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <React.Fragment>
      <header className="fixed w-screen bg-secondary-400 bg-opacity-100 z-40">
        <nav className="flex items-center justify-between">
          <div className="text-white flex items-center">
            {menuOpen ? (
              <CloseIcon
                onClick={handleClick}
                fontSize="large"
                className="ml-2"
              />
            ) : (
              <MenuIcon
                onClick={handleClick}
                fontSize="large"
                className="ml-2"
              />
            )}
            <img
              src={bushidologo}
              alt="header logo"
              className="ml-4 mr-6 w-32 h-auto"
            ></img>
          </div>
        </nav>
      </header>
      {menuOpen && <Menu />}
    </React.Fragment>
  );
};

const Menu = () => {
  const [modal, setModal] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className="fixed top-16 bg-secondary-400 text-white flex flex-col w-1/3 z-50">
      <div className="relative rounded-full text-white mr-12 flex items-center justify-center w-12 h-12">
        <img
          src={user.user.profilePic}
          alt="Profile"
          onClick={() => setUserMenu(!userMenu)}
          className="profile ml-16  border-2 border-white border-opacity-0  transition-all duration-300 hover:border-opacity-100"
        ></img>
        {userMenu ? (
          <ArrowDropUpIcon onClick={() => setUserMenu(!userMenu)} />
        ) : (
          <ArrowDropDownIcon onClick={() => setUserMenu(!userMenu)} />
        )}
      </div>
      {userMenu && <UserMenu user={user} logout={setUser} modal={setModal} />}
      <Link to="/home" className="mt-2">
        <span className="text-sm font-custom px-1">
          <HomeIcon fontSize="medium" style={{ paddingBottom: "2px" }} />
          <p className="px-1 inline-block border-white border-solid border-b-2 border-opacity-0 group-hover:border-opacity-100">
            {t("nav_home")}
          </p>
        </span>
      </Link>
      <Link to="/list" className="mt-4 mb-4">
        <span className="text-sm font-custom px-1 ">
          <WatchLaterIcon fontSize="medium" style={{ paddingBottom: "2px" }} />
          <p className="px-1 inline-block border-white border-solid border-b-2 border-opacity-0 group-hover:border-opacity-100">
            {t("nav_list")}
          </p>
        </span>
      </Link>
      {modal && <ChangePicModal open={setModal} sign={false} />}
    </div>
  );
};

const UserMenu = (props) => {
  const { t } = useTranslation();
  const [logout, { error }] = useMutation(LOGOUT);
  const client = useApolloClient();
  const history = useHistory();

  if (error) {
    console.log(error);
    return <div className="text-white">Error</div>;
  }

  const { username } = props.user.user;

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
    <div className=" rounded w-40 h-32 z-0 xs:divide-y divide-white px-2">
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

export default HomeNavResponsive;
