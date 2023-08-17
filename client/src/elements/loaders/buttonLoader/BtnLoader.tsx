import styles from "./btnLoaders.module.scss"


const BtnLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.scanner}>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default BtnLoader;