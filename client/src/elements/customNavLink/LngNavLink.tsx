import {NavLink} from "react-router-dom";
import {FC} from "react";
import i18 from "../../i18";

interface ILngNavLink {
  path: string,
  name?: string
}

const LngNavLink: FC<ILngNavLink> = ({path, name}) => {

  const actualLng = i18.language;

  const pathWithLng = actualLng === "en" ? path : `/${actualLng}/${path}`

  return (
    <NavLink to={pathWithLng}>{name}</NavLink>
  );
};

export default LngNavLink;