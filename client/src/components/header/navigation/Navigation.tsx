import {navigationRouters} from "./navigationRouters";
import {NavLink} from "react-router-dom";
import Drawer from "rc-drawer";
import motionProps from "../../../motion/motion";
import styles from "./navigation.module.scss";
import {FC} from "react";
import {useTranslation} from "react-i18next";

interface INavigation {
  openSideBar: boolean;
  setOpenSideBar: (state: boolean) => void;
}

const Navigation: FC<INavigation> = ({openSideBar, setOpenSideBar}) => {

  const {t} = useTranslation("navigate")

  return (
    <div className={styles.navigationBlock}>
      {navigationRouters.map(({name, path}) => (
        <NavLink key={name} to={path} className={({isActive}) => isActive ? `${styles.activeLink} ${styles.link}` : styles.link}>
          {t(name)}
        </NavLink>
      ))}
      <Drawer
        width="320px"
        open={openSideBar}
        onClose={() => setOpenSideBar(false)}
        destroyOnClose
        placement="left"
        {...motionProps}
      >
        {navigationRouters.map(({name, path}) => (
          <NavLink key={name} to={path} className={({isActive}) => isActive ? `${styles.activeLink} ${styles.link}` : styles.link}>
            {t(name)}
          </NavLink>
        ))}
      </Drawer>
    </div>
  );
};

export default Navigation;