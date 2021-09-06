import { useState } from "react";
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const LandingFAQ = () => {
  const { t } = useTranslation();
  return (
    <div className="container py-2 px-20 mx-auto mt-3 mb-0 flex flex-col justify-center items-start">
      <h1 className="font-custom text-white text-5xl mb-1">FAQ</h1>

      <Questions question={t("question_one")} answer={t("answer_one")} />
      <Questions question={t("question_two")} answer={t("answer_two")} />
      <Questions question={t("question_three")} answer={t("answer_three")} />
    </div>
  );
};

const Questions = ({ question, answer }) => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <div className="w-full h-auto m-1 ">
      <div
        onClick={handleClick}
        className="relative flex justify-between items-center px-2 py-2 rounded bg-secondary-300 cursor-pointer"
      >
        <h2 className="text-white text-xl font-custom">{question}</h2>
        {toggle ? (
          <CloseIcon fontSize="large" className="text-white" />
        ) : (
          <AddIcon fontSize="large" className="text-white" />
        )}
      </div>
      <div
        className={
          toggle
            ? "px-2 py-2 opacity-100 transition all ease-linear duration-200"
            : "opacity-0 px-0 py-0 h-0 "
        }
      >
        <p className="text-white font-custom">{answer}</p>
      </div>
    </div>
  );
};

export default LandingFAQ;
