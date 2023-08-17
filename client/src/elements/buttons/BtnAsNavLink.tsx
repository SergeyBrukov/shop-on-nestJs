import {NavLink, useNavigate} from "react-router-dom";
import styles from "./buttons.module.scss"

type TNavLinkAsBtn = {
    path: string
    name: string
    className?: string
}

const BtnAsNavLink = ({name, path, className}: TNavLinkAsBtn) => {
    const navigate = useNavigate();

    return (
        <div className={`${className} ${styles.navLinkAsBtn}`}>
            <button onClick={() => navigate(path)}>
                <span className="circle1"></span>
                <span className="circle2"></span>
                <span className="circle3"></span>
                <span className="circle4"></span>
                <span className="circle5"></span>
                <span className="text">{name}</span>
            </button>
        </div>

    )
}


export default BtnAsNavLink