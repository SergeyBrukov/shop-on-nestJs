import styles from "./input.module.scss";
import {FcSearch} from "react-icons/fc";
import React, {FC, useState} from "react";
import useSpeechRecognition from "../../utils/hooks/speecRecognition/useSpeechRecognition";

interface IMainSearchInput extends React.InputHTMLAttributes<HTMLInputElement> {

}

const MainSearchInput: FC<IMainSearchInput> = ({...props}) => {

  const [search, setSearch] = useState<string>("");

  const {startListening, isListening, stopListening, hasRecognitionSupport} = useSpeechRecognition(setSearch);

  return (
    <div className={styles.searchbar}>
      <div className={styles.searchbarWrapper}>
        <div className={styles.searchbarLeft}>
          <div className={styles.searchIconWrapper}>
            <span className={`${styles.searchIcon} ${styles.searchbarIcon}`}>
              <FcSearch />
            </span>
          </div>
        </div>
        <div className={styles.searchbarCenter}>
          <div className={styles.searchbarInputSpacer}></div>
          <input type="text" {...props} value={search} onChange={e => setSearch(e.target.value)} className={styles.searchbarInput} name="q" autoCapitalize="off" autoComplete="off" title="Search" role="combobox" />
        </div>
        <div className={styles.searchbarRight}>
          {isListening ?
            <svg onClick={stopListening} className={styles.voiceSearch} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#FF1520"
                d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
              >
              </path>
              <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
              <path fill="#fbbc05" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z">
              </path>
              <path
                fill="#ea4335"
                d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
              >
              </path>
            </svg>
            :
            <svg onClick={startListening} className={styles.voiceSearch} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#4285f4"
                d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
              >
              </path>
              <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
              <path fill="#fbbc05" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z">
              </path>
              <path
                fill="#ea4335"
                d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
              >
              </path>
            </svg>
          }
        </div>
      </div>
    </div>
  );
};

export default MainSearchInput;