import React from "react";
import { useTranslation } from "react-i18next";

const LoginError = (props) => {
  const { t } = useTranslation();

  if (props.error[props.type].includes("Error")) {
    let error = props.error[props.type];
    return (
      <div>
        <p className="text-primary-400 font-custom text-center border-t-2 border-primary-400 w-64">
          {error.replace(error, `${t(`login_error_${props.type}`)}`)}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-primary-400 w-0 "></p>
    </div>
  );
};

export default LoginError;
