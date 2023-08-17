import i18next from "i18next";
import {useState} from "react";
import {defaultLang, langProject} from "../../../utils/conts";
import styles from "./lngSelect.module.scss"

const LanguageSelect = () => {

  const [actualLang, setActualLang] = useState(i18next.language);

  const handleChangeLang = (value: string) => {
    i18next.changeLanguage(value);
    setActualLang(value);
    const pathName = window.location.pathname;

    const regex = new RegExp(`^/(${langProject.join("|")})/`);

    const newPath = value === defaultLang ? pathName.replace(regex, "/") : `/${value}${pathName}`;

    window.history.replaceState({}, "", newPath);
  };


  return (
    <select className={styles.lngSelect} value={actualLang} onChange={e => handleChangeLang(e.target.value)}>
      <option value="en">EN</option>
      <option value="ua">UA</option>
    </select>
  );
};

export default LanguageSelect;