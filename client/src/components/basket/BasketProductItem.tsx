import {IBasketProduct} from "../../utils/interface/basketDetailsInterface";
import {FC} from "react";
import styles from "./basketProductItem.module.scss";
import {useAppDispatch} from "../../app/hooks";
import {decrementCountBasketProductItem, incrementCountBasketProductItem} from "../../features/basket/basketSlice";
import {handleRemoveProductFromUserBasket} from "../../features/user/userSlice";

interface IBasketProductItem {
  id: number,
  count: number,
  basketItem: IBasketProduct;
}

const BasketProductItem: FC<IBasketProductItem> = ({id: basketItemID, count, basketItem}) => {

  const dispatch = useAppDispatch();

  const {id, new: productNew, articul, category, name, image, price, producer, bestseller} = basketItem;

  const incrementCount = () => {
    dispatch(incrementCountBasketProductItem({id: basketItemID}));
  };

  const decrementCount = () => {
    if (count > 1) {
      dispatch(decrementCountBasketProductItem({id: basketItemID}));
    }
  };

  const handleRemoveProductInBasket = () => {
    dispatch(handleRemoveProductFromUserBasket(id));
  };

  return (
    <div className={styles.basketProductItemWrapper}>
      <img alt={image[0].fileName} src={`${import.meta.env.VITE_MAIN_AXIOS_URL}/${image[0].filePath}`} />
      {name}
      <div className={styles.countBlock}>
        <span onClick={decrementCount}>-</span>
        <p>{count}</p>
        <span onClick={incrementCount}>+</span>
      </div>
      <h3>{price} $</h3>
      <p className={styles.actionDelete} onClick={handleRemoveProductInBasket}>Delete</p>
    </div>
  );
};

export default BasketProductItem;