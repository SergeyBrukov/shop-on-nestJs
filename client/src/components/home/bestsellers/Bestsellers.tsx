import {useTranslation} from "react-i18next";
import styles from "./bestsellers.module.scss";
import BestsellersList from "./BestsellersList";

const Bestsellers = () => {

  const {t} = useTranslation("home");

  return (
    <div className={styles.bestsellersWrapper}>
      <h2>{t("bestsellers")}</h2>
      <BestsellersList />
    </div>
  );
};

export default Bestsellers;