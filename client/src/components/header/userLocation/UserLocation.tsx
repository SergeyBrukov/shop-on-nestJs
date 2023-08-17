import {useEffect, useState} from "react";
import axios from "axios";
import {FaLocationArrow} from "react-icons/fa";
import styles from "./userLocation.module.scss"

const UserLocation = () => {

    const [userLocation, setUserLocation] = useState<string | null>(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                (async () => {
                    try {
                        const {data} = await axios.get("https://ipapi.co/json");
                        setUserLocation(data.city)
                    } catch (err: any) {
                        throw new Error(err)
                    }
                })()
            })
        }
    }, [])

    return (
        <div className={styles.locationBlock}>
           <FaLocationArrow className={styles.faLocationArrow}/>
            <span className={styles.city}>
                {userLocation}
            </span>
        </div>
    )
}

export default UserLocation