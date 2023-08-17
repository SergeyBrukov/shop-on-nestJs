import Header from "../header/Header";
import {Outlet, useLocation, useParams} from "react-router-dom";
import i18 from "../../i18";
import {useEffect, useRef} from "react";
import {defaultLang, langProject} from "../../utils/conts";

const Layout = () => {
  const {pathname} = useLocation();

  const didMount = useRef(true)

  const examinationLoginRegisterPathName = !pathname.includes("login") && !pathname.includes("register");

  const regex = new RegExp(`^/(${langProject.join("|")})/`);

  const actualLng = useRef(i18.language);

  const pathWithoutId = pathname.replace(`/${actualLng.current}`, "");


  i18.on("languageChanged", (lng) => {
    actualLng.current = lng;
  });


  useEffect(() => {
    if(didMount.current) {
      didMount.current = false
      return
    }

    const newPath = actualLng.current === defaultLang ? pathname.replace(regex, "/") : `/${actualLng.current}${pathname}`;

    window.history.replaceState({}, "", newPath);

  }, [pathWithoutId]);

  return (
    <>
      {examinationLoginRegisterPathName && <Header />}
      <Outlet />
    </>
  );
};

export default Layout;