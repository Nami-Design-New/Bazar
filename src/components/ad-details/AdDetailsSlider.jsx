import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

function AdDetailsSlider({ images, className }) {
  return (
    <Swiper
      spaceBetween={12}
      slidesPerView={1}
      speed={1000}
      loop={true}
      modules={[Autoplay, Navigation]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className={`itemDetailsSlider ${className}`}
      navigation={{
        nextEl: `swiper-btn-next`,
        prevEl: `.swiper-btn-prev`,
      }}
    >
      {images?.map((image) => (
        <SwiperSlide key={image?.id}>
          <a data-fancybox="gallery" href={image?.image}>
            <img src={image?.image} alt="" />
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default AdDetailsSlider;
