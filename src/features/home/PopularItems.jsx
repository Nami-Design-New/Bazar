import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Post from "../../ui/cards/Post";

function PopularItems() {
  return (
    <section className="popular">
      <div className="container">
        <div className="topHead">
          <div className="sectionTitle">
            <span className="subtitle">الأكثر رواجًا الآن</span>
            <h4 className="title">تصفح العناصر حسب الشعبية</h4>
          </div>

          <div className="swiperControl">
            <div className="swiperBtns">
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        </div>

        <Swiper
          spaceBetween={12}
          slidesPerView={3}
          speed={1000}
          loop={true}
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="mainSliderContainer"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }}
          breakpoints={{
            992: {
              slidesPerView: 3
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
    </section>
  );
}

export default PopularItems;
