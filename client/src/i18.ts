import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // pass the i18n instance to react-i18next.
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    supportedLngs: ["en", "ua"],
    fallbackLng: false,
    // debug: true,
    detection: {
      order: ["path", "htmlTag"],
      caches: ["cookie"]
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      transSupportBasicHtmlNodes: true,
      bindI18n: 'languageChanged',
    },
  });


export default i18n;