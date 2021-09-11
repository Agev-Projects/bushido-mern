import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import LOGIN from "../graphql/Mutations/login";
import LoginError from "../components/AuthErrors/LoginError";

import landingImg from "../assets/images/banner.png";
import bushidologo from "../assets/images/bushidologo.png";
import GET_USER from "../graphql/Queries/getUser";
import Loading from "../components/States/Loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error, data }] = useMutation(LOGIN, {
    errorPolicy: "ignore",
    refetchQueries: [GET_USER, "getUser"],
  });
  let history = useHistory();
  const { t } = useTranslation();

  if (error) {
    console.log(error);
    return <div className="text-white">Error</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({
      variables: { email, password },
    });
    if (
      response.data.login.email.includes("Incorrect") ||
      response.data.login.password.includes("Incorrect")
    ) {
      return console.log(response);
    }
    history.push("/home");
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
          {t("login")}
        </h2>
        <div className="flex flex-col justify-center items-center">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            className="rounded bg-secondary-400 w-64 h-10 p-4"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {data && <LoginError error={data.login} type="email" />}

          <input
            type="password"
            id="password"
            name="password"
            placeholder={t("password")}
            required
            className="rounded bg-secondary-400 w-64 h-10 p-4 mt-4"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {data && <LoginError error={data.login} type="password" />}
          <button className="btn-primary w-1/2 h-12 mt-6">
            {loading ? (
              <div className="flex justify-center">
                <Loading stroke="#FFF" />
              </div>
            ) : (
              t("login")
            )}
          </button>
        </div>

        <p className=" text-gray-500 pt-4 text-center mt-4">
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
      </form>
    </div>
  );
};

export default LoginPage;
