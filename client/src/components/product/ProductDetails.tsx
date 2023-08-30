import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect, useMemo, useState} from "react";
import {getProductById} from "../../features/products/productItemSlice";
import styles from "./productDetails.module.scss";
import MainContainer from "../../elements/container/MainContainer";
import {SlBasket} from "react-icons/sl";
import {motion} from "framer-motion";
import {handleAddProductInUserBasket, handleRemoveProductFromUserBasket} from "../../features/user/userSlice";

const iconVariants = {
  hidden: {x: 0}, // Початковий стан - зсув на 0 пікселів
  visible: {x: 15} // Зсув на 15 пікселів
};


const ProductDetails = () => {
  const {id} = useParams();

  const dispatch = useAppDispatch();
  const {product, loading} = useAppSelector(store => store.productItemSlice);
  const basket = useAppSelector(store => store.userSlice.user?.basket.products);
  const [isHovered, setIsHovered] = useState(false);

  const [mainImageIndex, setMainImageIndex] = useState(0);

  const productImagesCaruselMemo = useMemo(() => {
    return product?.image.filter(image => image.id !== product?.image[mainImageIndex].id);
  }, [mainImageIndex, product]);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, []);

  const examinationProductIdInBasketUser = useMemo(() => {
    const findProductInBasket = basket?.findIndex(element => element.productId === Number(id));

    return findProductInBasket !== -1;
  }, [id, basket]);

  if (loading) {
    return <></>;
  }

  if (!product) {
    return <></>;
  }

  const {id: productId, articul, bestseller, category, image, name, price, producer} = product;

  const handleAddProductInBasket = () => {
    dispatch(handleAddProductInUserBasket(productId));
  };

  const handleRemoveProductInBasket = () => {
    dispatch(handleRemoveProductFromUserBasket(productId));
  };

  return (
    <div className={styles.productItemWrapper}>
      <MainContainer className={styles.productDetailContainer}>
        <motion.h2
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{
            duration: 1
          }}
        >
          {name}
        </motion.h2>
        <div className={styles.productMainInfo}>
          <motion.div
            className={styles.productImageBlock}
            initial={{x: -200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{
              delay: 0.1
            }}
          >
            <img alt={image[mainImageIndex].fileName} src={`${import.meta.env.VITE_MAIN_AXIOS_URL}/${image[mainImageIndex].filePath}`} />
            <div className={styles.productImagesCarusel}>
              {(productImagesCaruselMemo && productImagesCaruselMemo.length > 0) && productImagesCaruselMemo.map(imageCarusel => {
                const elementIndex = image.findIndex(element => element.id === imageCarusel.id);
                return (
                  <img key={imageCarusel.id} alt={imageCarusel.fileName} src={`${import.meta.env.VITE_MAIN_AXIOS_URL}/${imageCarusel.filePath}`} onClick={() => setMainImageIndex(elementIndex)} />
                );
              })}
            </div>
          </motion.div>
          <motion.div
            className={styles.productInfo}
            initial={{x: 200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{
              delay: 0.3
            }}
          >
            <p className={styles.price}>Price: {price} $</p>
            <p className={styles.articul}>Articul: {articul}</p>
            <p className={styles.category}>Category: {category.name}</p>
            <p className={styles.producer}>Producer: {producer.name}</p>
            {examinationProductIdInBasketUser ?
              <button
                onClick={handleRemoveProductInBasket} className={styles.buttonAddBasket} style={{
                background: "#ff5454",
                color: "#fff"
              }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
              >
                Delete product
              </button> :
              <button className={styles.buttonAddBasket} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleAddProductInBasket}>
                Shop now
                <motion.span
                  variants={iconVariants}
                  initial="hidden"
                  animate={isHovered ? "visible" : "hidden"}
                >
                  <SlBasket />
                </motion.span>
              </button>}
          </motion.div>
        </div>
      </MainContainer>
    </div>
  );
};

export default ProductDetails;