import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import img1 from "../../assets/images/item (1).jpg";
import img2 from "../../assets/images/item (2).jpg";
import img3 from "../../assets/images/item (3).jpg";
import img4 from "../../assets/images/item (4).jpg";
import img5 from "../../assets/images/item (6).jpg";

function AdDetailsSlider() {
  const images = [img1, img2, img3, img4, img5];

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
          disableOnInteraction: false
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <a data-fancybox="gallery" href={image}>
              <img src={image} alt="" />
            </a>
          </SwiperSlide>
        ))}

        <div className="swiperControl">
          <div className="swiperBtns">
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default AdDetailsSlider;
