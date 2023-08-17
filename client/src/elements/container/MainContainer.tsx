import styles from "./mainContainer.module.scss"
import {ReactNode} from "react";

const MainContainer = ({children, className}: { children: ReactNode, className?: string }) => {
    return (
        <div className={`${className} ${styles.container}`}>
            {children}
        </div>
    )
}

export default MainContainer