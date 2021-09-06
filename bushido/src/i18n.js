import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n_backend from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(i18n_backend)
  .init({
    supportedLngs: ["en", "es", "pt"],
    fallbackLng: "en",
    detection: {
      order: ["path", "cookie", "navigator", "htmlTag"],
      caches: ["cookie"],
      backend: {
        loadPath: "/locales/{{lng}}/translation.js",
      },
      react: { useSuspense: false },
    },
  });

export default i18n;
