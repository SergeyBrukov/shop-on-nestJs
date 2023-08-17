import styles from "./swiperProducer.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, FreeMode, Navigation} from "swiper/modules";
import {useAppSelector} from "../../../app/hooks";

const SwiperProducers = () => {

  const {producers, loading} = useAppSelector(store => store.producersSlice);

  return (
    <div className={styles.swiperProducersWrapper}>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
          delay: 2000
        }}
        loop={true}
        pagination={{
          clickable: true
        }}
        modules={[FreeMode, Autoplay]}
        className="mySwiper"
      >
        {producers.map(producer => (
          <SwiperSlide key={producer.id}>
              <img alt={producer.name} className={styles.producer} src={`${import.meta.env.VITE_MAIN_AXIOS_URL}/${producer.image.filePath}`}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperProducers;