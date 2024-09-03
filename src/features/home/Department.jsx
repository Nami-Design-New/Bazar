import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Post from "../../ui/cards/Post";

function Department({ index }) {
  const baseDelay = 1000;
  const delay = baseDelay + index * 1000;

  return (
    <div className="slider_wrap">
      <div className="container">
        <div className="topHead">
          <div className="sectionTitle">
            <span className="subtitle">خلّ أحلامك تمشي على أربع</span>
            <h4 className="title">تصفّح العروض حسب السيارات</h4>
          </div>
          <div className="swiperControl">
            <div className="swiperBtns">
              <div className={`swiper-button-next btn_${index}`} />
              <div className={`swiper-button-prev btn_${index}`} />
            </div>
          </div>
        </div>

        <Swiper
          spaceBetween={12}
          slidesPerView={4}
          speed={1000}
          loop={true}
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: delay, disableOnInteraction: false }}
          className="mainSliderContainer"
          navigation={{
            nextEl: `.btn_${index}`,
            prevEl: `.btn_${index}`
          }}
          breakpoints={{
            992: {
              slidesPerView: 4
            },
            768: {
              slidesPerView: 2
            },
            350: {
              slidesPerView: 1
            }
          }}
        >
          <SwiperSlide>
            <Post />
          </SwiperSlide>
          <SwiperSlide>
            <Post />
          </SwiperSlide>
          <SwiperSlide>
            <Post />
          </SwiperSlide>
          <SwiperSlide>
            <Post />
          </SwiperSlide>
          <SwiperSlide>
            <Post />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Department;
