import {FaUserTie} from "react-icons/fa";
import styles from "./user.module.scss";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {GrLogout} from "react-icons/gr";
import {handleLogout} from "../../../features/user/userSlice";
import {useNavigate} from "react-router-dom";

const iconVariants = {
  hidden: {x: 0}, // Початковий стан - зсув на 0 пікселів
  visible: {x: 15} // Зсув на 15 пікселів
};

const User = () => {
  const navigate = useNavigate();

  const [openUserBar, setOpenUserBar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useAppDispatch();
  const {user} = useAppSelector(store => store.userSlice);

  if (!user) {
    return;
  }

  const handleLogOut = () => {
    dispatch(handleLogout());
    navigate("/login");

  };

  return (
    <div className={styles.userBlock}>
      <FaUserTie className={styles.faUser} onClick={() => setOpenUserBar(prev => !prev)} />

      <AnimatePresence>
        {openUserBar && (
          <motion.div
            className={styles.userInfoAndLogoutBlock}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <div className={styles.userMainInfo}>
              <p>{user.name}</p>
              <span>{user.email}</span>
            </div>
            <p className={styles.logout} onClick={handleLogOut} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              Logout
              <motion.span
                variants={iconVariants}
                initial="hidden"
                animate={isHovered ? "visible" : "hidden"}
              >
                <GrLogout />
              </motion.span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default User;