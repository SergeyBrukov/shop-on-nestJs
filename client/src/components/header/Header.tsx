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
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";

const Header = () => {

  const navigate = useNavigate();

  const basketUser = useAppSelector(store => store.userSlice.user?.basket.products);

  const {t} = useTranslation(["header", "navigate"]);

  const [openSideBar, setOpenSideBar] = useState(false);

  const redirectOnBasketPage = () => {
    navigate("/basket");
  };

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
          <div className={styles.logo} onClick={() => navigate("/")}>
            <GiReactor />
          </div>
          <div className={styles.searchInput}>
            <MainSearchInput placeholder={t("search")} />
          </div>
          <LanguageSelect />
          <ThemeBtn />
          <div className={styles.basket} onClick={redirectOnBasketPage}>
            <BsBasketFill />
            {basketUser && <span className={styles.basketCount}>{basketUser.length}</span>}
          </div>
        </MainContainer>
      </div>
    </header>
  );
};

export default Header;