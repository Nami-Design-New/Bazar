import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import c1 from "../../assets/images/icon (1).svg";
import loc from "../../assets/images/location.svg";
import clock from "../../assets/images/clock.svg";
import pro from "../../assets/images/item (6).jpg";
import user from "../../assets/images/user (13).png";
import heart from "../../assets/images/heart.svg";

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
            <div className="item">
              <button className="favorite active">
                <img src={heart} alt="" />
              </button>
              <a href="itemDetails.html" className="itemImg">
                <img src={pro} loading="lazy" alt="" />
              </a>
              <div className="itemInfo">
                <a href="advertiser.html" className="advertiser">
                  <img src={user} loading="lazy" alt="" />
                </a>
                <div className="time">
                  <img src={clock} alt="" /> 1h ago
                </div>
                <a href="itemDetails.html" className="title">
                  Apple MacBook Air (2023) Apple M2 Chip
                </a>
                <p className="description">
                  The Apple MacBook Air 13.6-Inch laptop is powered by the new
                  M2 chip. It is loaded with 8GB RAM and 256GB SSD.
                </p>
                <div className="location">
                  <img src={loc} alt="" />
                  <span> USA, California </span>
                </div>
                <div className="itemBottom">
                  <a href="listing.html" className="category">
                    <span className="img">
                      <img src={c1} alt="" />
                    </span>
                    Electronics
                  </a>
                  <div className="price">
                    <span> $ 1,200 </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <button className="favorite active">
                <img src={heart} alt="" />
              </button>
              <a href="itemDetails.html" className="itemImg">
                <img src={pro} loading="lazy" alt="" />
              </a>
              <div className="itemInfo">
                <a href="advertiser.html" className="advertiser">
                  <img src={user} loading="lazy" alt="" />
                </a>
                <div className="time">
                  <img src={clock} alt="" /> 1h ago
                </div>
                <a href="itemDetails.html" className="title">
                  Apple MacBook Air (2023) Apple M2 Chip
                </a>
                <p className="description">
                  The Apple MacBook Air 13.6-Inch laptop is powered by the new
                  M2 chip. It is loaded with 8GB RAM and 256GB SSD.
                </p>
                <div className="location">
                  <img src={loc} alt="" />
                  <span> USA, California </span>
                </div>
                <div className="itemBottom">
                  <a href="listing.html" className="category">
                    <span className="img">
                      <img src={c1} alt="" />
                    </span>
                    Electronics
                  </a>
                  <div className="price">
                    <span> $ 1,200 </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <button className="favorite active">
                <img src={heart} alt="" />
              </button>
              <a href="itemDetails.html" className="itemImg">
                <img src={pro} loading="lazy" alt="" />
              </a>
              <div className="itemInfo">
                <a href="advertiser.html" className="advertiser">
                  <img src={user} loading="lazy" alt="" />
                </a>
                <div className="time">
                  <img src={clock} alt="" /> 1h ago
                </div>
                <a href="itemDetails.html" className="title">
                  Apple MacBook Air (2023) Apple M2 Chip
                </a>
                <p className="description">
                  The Apple MacBook Air 13.6-Inch laptop is powered by the new
                  M2 chip. It is loaded with 8GB RAM and 256GB SSD.
                </p>
                <div className="location">
                  <img src={loc} alt="" />
                  <span> USA, California </span>
                </div>
                <div className="itemBottom">
                  <a href="listing.html" className="category">
                    <span className="img">
                      <img src={c1} alt="" />
                    </span>
                    Electronics
                  </a>
                  <div className="price">
                    <span> $ 1,200 </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <button className="favorite active">
                <img src={heart} alt="" />
              </button>
              <a href="itemDetails.html" className="itemImg">
                <img src={pro} loading="lazy" alt="" />
              </a>
              <div className="itemInfo">
                <a href="advertiser.html" className="advertiser">
                  <img src={user} loading="lazy" alt="" />
                </a>
                <div className="time">
                  <img src={clock} alt="" /> 1h ago
                </div>
                <a href="itemDetails.html" className="title">
                  Apple MacBook Air (2023) Apple M2 Chip
                </a>
                <p className="description">
                  The Apple MacBook Air 13.6-Inch laptop is powered by the new
                  M2 chip. It is loaded with 8GB RAM and 256GB SSD.
                </p>
                <div className="location">
                  <img src={loc} alt="" />
                  <span> USA, California </span>
                </div>
                <div className="itemBottom">
                  <a href="listing.html" className="category">
                    <span className="img">
                      <img src={c1} alt="" />
                    </span>
                    Electronics
                  </a>
                  <div className="price">
                    <span> $ 1,200 </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default PopularItems;
