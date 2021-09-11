import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import SIGNUP from "../graphql/Mutations/signup";
import SignupError from "../components/AuthErrors/SignupError";
import landingImg from "../assets/images/banner.png";
import bushidologo from "../assets/images/bushidologo.png";
import ChangePicModal from "../components/User/ChangePicModal";
import GET_USER from "../graphql/Queries/getUser";
import Loading from "../components/States/Loading";

const SignPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(
    "https://i.ibb.co/nsKb6XV/default-picture.jpg"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [signup, { loading, error, data }] = useMutation(SIGNUP, {
    errorPolicy: "ignore",
    refetchQueries: [GET_USER, "getUser"],
  });
  const history = useHistory();
  const { t } = useTranslation();

  if (error) {
    console.log(error);
    return <div className="text-white">Error</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup({
      variables: { username, email, password, profilePic },
    });
    console.log(response);
    if (
      response.data.signup.email.includes("Error") ||
      response.data.signup.password.includes("Error") ||
      response.data.signup.username.includes("Error")
    ) {
      return console.log(response);
    }
    history.push("/home");
  };

  const handleModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative p-12">
      <img
        src={landingImg}
        alt="bushidoLanding"
        className="absolute top-0 object-cover lg:w-full h-auto lg:h-full z-0"
      ></img>
      <Link to="/">
        <img
          src={bushidologo}
          alt="Bushido Logo"
          className="absolute top-0 left-0 w-1/3 xs:w-1/6 h-auto ml-2"
        ></img>
      </Link>
      <form
        className="bg-secondary-600 bg-opacity-70 rounded w-full md:w-1/2 lg:w-1/3 h-full mt-12 lg:mt-0 flex flex-col  text-white z-20"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="font-custom text-white text-semibold text-4xl my-8 ml-4">
          {t("sign_up")}
        </h2>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            id="username"
            name="username"
            placeholder={t("username")}
            required
            className="rounded bg-secondary-400 w-64 h-10 p-4 mb-4 "
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          {data && <SignupError error={data.signup} type="username" />}

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            className="rounded bg-secondary-400 w-64 h-10 p-4 mb-4 "
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {data && <SignupError error={data.signup} type="email" />}

          <input
            type="password"
            id="password"
            name="password"
            placeholder={t("password")}
            required
            className="rounded bg-secondary-400 w-64 h-10 p-4"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {data && <SignupError error={data.signup} type="password" />}
          <p className=" mt-4">{t("choose_pic")}</p>
          <div
            onClick={handleModal}
            className="rounded-full w-28 h-28 mr-4 mt-2 bg-white bg-opacity-0 transition-all duration-300 hover:bg-opacity-100 "
          >
            <img
              src={profilePic}
              alt="profile"
              className="profile cursor-pointer border-4 border-white border-opacity-0 transition-all duration-300 transform hover:border-opacity-100 hover:scale-105"
            />
          </div>

          <button className="btn-primary w-2/3 h-12 mt-6">
            {loading ? (
              <div className="flex justify-center">
                <Loading stroke="#FFF" />
              </div>
            ) : (
              t("sign_up")
            )}
          </button>
        </div>

        <p className=" text-gray-500 pt-4 text-center mt-4">
          &copy;2021 <span className="underline">Agev</span>, Bushido! All
          Rights reserved.
        </p>
      </form>
      {isOpen && (
        <ChangePicModal open={setIsOpen} setPic={setProfilePic} sign={true} />
      )}
    </div>
  );
};

export default SignPage;
