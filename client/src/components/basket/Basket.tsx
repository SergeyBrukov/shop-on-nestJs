import styles from "./basket.module.scss";
import MainContainer from "../../elements/container/MainContainer";
import {useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getDetailsBasket} from "../../features/basket/basketSlice";
import {SlBasket} from "react-icons/sl";
import {FiEdit} from "react-icons/fi";
import BasketProductItem from "./BasketProductItem";
import SubmitBtn from "../../elements/buttons/SubmitBtn";
import {createOrderByUser} from "../../features/orders/ordersSlice";

const Basket = () => {

  const [edit, setEdit] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const {basket} = useAppSelector(store => store.basketSlice);

  useEffect(() => {
    dispatch(getDetailsBasket());
  }, []);

  const totalPrice = useMemo(() => {
    const price = basket.reduce((acc, curr) => {
      return acc + Number(curr.product.price) * curr.count;
    }, 0);

    return price;
  }, [basket]);

  if (!basket || basket.length === 0) {
    return <>Basket empty</>;
  }

  const createOrders = () => {

    const orderProducts = basket.map(item => ({id: item.product.id, count: item.count}));

    dispatch(createOrderByUser({orderProducts, totalPrice}));
  };

  return (
    <div className={styles.basketWrapper}>
      <MainContainer className={styles.basketContainer}>
        <h2 className={styles.title}>Checkout order</h2>
        <div className={styles.topBasketBlock}>
          <div className={styles.topBasketBlockTitle}>
            <SlBasket className={styles.basketIcon} />
            <h3>Basket</h3>
          </div>
          <div className={styles.topBasketBlockEdit} onClick={() => setEdit(prev => !prev)} style={{color: `${edit ? "#E0595D" : "green"}`}}>
            <FiEdit />
            Edit
          </div>
        </div>
        <div className={styles.basketProductsBlock}>
          {basket.map(basketItem => (
            <BasketProductItem key={basketItem.id} id={basketItem.id} count={basketItem.count} basketItem={basketItem.product} />
          ))}
          <div className={styles.basketProductsTotalAmountBlock}>
            <p>Total order amount:</p>
            <h3>{totalPrice} $</h3>
          </div>
          <div className={styles.basketProductsContinue}>
            <SubmitBtn text="Continue" disabled={edit} />
          </div>
        </div>
        <div className={styles.orderTitleBlock}>
          <h3>Total</h3>
        </div>
        <div className={styles.orderMainBlock}>
          <div className={styles.orderMainInfo}>
            <div className={styles.countAndPriceTotal}>
              <p>
                Products ({basket.length})
              </p>
              <p>{totalPrice} $</p>
            </div>
            <div className={styles.forTheAmount}>
              <p>For the amount</p>
              <h3>{totalPrice} $</h3>
            </div>
          </div>
          <button disabled={!edit} onClick={createOrders}>Confirm order</button>
        </div>
      </MainContainer>
    </div>
  );
};

export default Basket;