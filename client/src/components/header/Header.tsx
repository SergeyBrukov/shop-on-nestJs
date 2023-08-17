import styles from "./header.module.scss";
import MainContainer from "../../elements/container/MainContainer";
import UserLocation from "./userLocation/UserLocation";
import Navigation from "./navigation/Navigation";
import User from "./user/User";
import {useState} from "react";
import {RxHamburgerMenu} from "react-icons/rx";
import {GiReactor} from "react-icons/gi";
import {useTranslation} from "react-i18next";
import LanguageSelect from "./languagerSelect/LanguageSelect";
import ThemeBtn from "../../elements/themeBtn/ThemeBtn";
import MainSearchInput from "../../elements/input/MainSearchInput";
import {BsBasketFill} from "react-icons/bs";

const Header = () => {

  const {t} = useTranslation(["header", "navigate"]);

  const [openSideBar, setOpenSideBar] = useState(false);


  return (
    <header>
      <div className={styles.navHeaderBlock}>
        <MainContainer className={styles.mainBlock}>
          <RxHamburgerMenu onClick={() => setOpenSideBar(true)} className={styles.burgerMenuIcon} />
          <UserLocation />
          <Navigation openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
          <User />
        </MainContainer>
      </div>
      <div className={styles.subHeaderWrapper}>
        <MainContainer className={styles.subHeaderContainer}>
          <div className={styles.logo}>
            <GiReactor />
          </div>
          <div className={styles.searchInput}>
            <MainSearchInput placeholder={t("search")} />
          </div>
          <LanguageSelect />
          <ThemeBtn />
          <div className={styles.basket}>
            <BsBasketFill />
          </div>
        </MainContainer>
      </div>
    </header>
  );
};

export default Header;