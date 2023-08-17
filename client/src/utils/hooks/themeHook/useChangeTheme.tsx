import {useEffect, useRef, useState} from "react";

type TUseChangeTheme = {
    examinationStatusTheme: boolean
    themeStatus: string
    changeTheme: () => void
}

export const useChangeTheme = ():TUseChangeTheme => {

    const storageStatus = localStorage.getItem("theme")
    const body = document.body;

    const [themeStatus, setThemeStatus] = useState(storageStatus || "light");

    const examinationStatusTheme = themeStatus !== "light";

    const changeTheme = () => {
        const theme = themeStatus === "light" ? "dark" : "light";
        localStorage.removeItem("theme");
        localStorage.setItem("theme", theme)
        body.className = theme
        setThemeStatus(theme);
    }

    useEffect(() => {

        if (storageStatus && storageStatus !== "light" && storageStatus !== "dark") {
            localStorage.removeItem("theme");
            localStorage.setItem("theme", "light")
            body.className = "light"
        }

        if (!storageStatus) {
            localStorage.setItem("theme", "light")
            body.className = "light"
        } else {
            body.className = storageStatus
        }

    }, [])


    return {
        examinationStatusTheme, themeStatus, changeTheme
    }
}