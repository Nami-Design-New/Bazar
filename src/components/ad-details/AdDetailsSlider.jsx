import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function AdDetailsSlider({ images }) {
  return (
    <div className="itemDetailsSlider">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={12}
        slidesPerView={1}
        loop={true}
        speed={1000}
        className="itemDetailsSlider"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {images?.map((image) => (
          <SwiperSlide key={image?.id}>
            <a data-fancybox="gallery" href={image?.image}>
              <img src={image?.image} alt="" />
            </a>
          </SwiperSlide>
        ))}

        {images?.length > 1 && (
          <div className="swiperControl">
            <div className="swiperBtns">
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        )}
      </Swiper>
    </div>
  );
}

export default AdDetailsSlider;
