import React from "react";

const LoginError = (props) => {
  if (props.error[props.type].includes("Error")) {
    let error = props.error[props.type];
    return (
      <div>
        <p className="text-primary-400 text-semibold">
          {error.replace("Error: ", "")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-primary-400 text-semibold"></p>
    </div>
  );
};

export default LoginError;
