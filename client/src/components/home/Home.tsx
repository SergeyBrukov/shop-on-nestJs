import MainContainer from "../../elements/container/MainContainer";
import SwiperProducers from "./swiperBlock/SwiperProducers";
import {useEffect} from "react";
import {useAppDispatch} from "../../app/hooks";
import {getProducers} from "../../features/producers/producersSlice";
import Bestsellers from "./bestsellers/Bestsellers";
import {getAllProduct} from "../../features/products/productsSlice";

const Home = () => {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getProducers());
    dispatch(getAllProduct());
  }, []);

  return (
    <MainContainer>
      <SwiperProducers />
      <Bestsellers />
    </MainContainer>
  );
};
export default Home;