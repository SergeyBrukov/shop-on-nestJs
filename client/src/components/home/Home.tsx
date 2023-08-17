import MainContainer from "../../elements/container/MainContainer";
import SwiperProducers from "./swiperBlock/SwiperProducers";
import {useEffect} from "react";
import {useAppDispatch} from "../../app/hooks";
import {getProducers} from "../../features/producers/producersSlice";

const Home = () => {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getProducers());
  }, []);

  return (
    <MainContainer>
      <SwiperProducers />
    </MainContainer>
  );
};
export default Home;