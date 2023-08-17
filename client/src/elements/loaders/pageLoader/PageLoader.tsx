import styles from "./pageLoader.module.scss"

const PageLoader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loaderSquare}></div>
            <div className={styles.loaderSquare}></div>
            <div className={styles.loaderSquare}></div>
            <div className={styles.loaderSquare}></div>
            <div className={styles.loaderSquare}></div>
            <div className={styles.loaderSquare}></div>
            <div className={styles.loaderSquare}></div>
        </div>
    )
}

export default PageLoader