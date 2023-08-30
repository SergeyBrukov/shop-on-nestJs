import {useAppSelector} from "../../../app/hooks";
import styles from "./bestsellers.module.scss";
import BestsellersItem from "./BestsellersItem";
const BestsellersList = () => {
  const products = useAppSelector(store => store.productSlice.products);

  return (
    <div className={styles.bestsellersList}>
      {products.map((product, index) => (
        <BestsellersItem key={product.id} product={product} index={index}/>
      ))}
    </div>
  );
};

export default BestsellersList;