import styles from "./bestsellers.module.scss";
import {TProduct} from "../../../utils/type/productType";
import {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const ANIMATION_DELAY_TIMEOUT_ITEM = 150;

interface IBestsellersItem {
  product: TProduct,
  index: number
}

const BestsellersItem: FC<IBestsellersItem> = ({product, index}) => {
  const navigate = useNavigate();

  const [isAnimationPlayed, setIsAnimationPlayed] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsAnimationPlayed(true);
    }, ANIMATION_DELAY_TIMEOUT_ITEM * index);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isAnimationPlayed) {
    return;
  }

  return (
    <div className={isAnimationPlayed ? styles.animationPlayed : ""} onClick={() => navigate(`/product/${product.id}`)}>
      <div className={styles.card}>
        <div className={styles.cardMainInfo}>
          <img className={styles.cardImg} alt={product.name} src={`${import.meta.env.VITE_MAIN_AXIOS_URL}/${product.image[0].filePath}`} />
          <p className={styles.cardName}>{product.name}</p>
          <p className={styles.cardArticul}>Articul: {product.articul}</p>
          <p className={styles.cardPrice}>{product.price} $</p>
        </div>
      </div>
    </div>

  );
};

export default BestsellersItem;