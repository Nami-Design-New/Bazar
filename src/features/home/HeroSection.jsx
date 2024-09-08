import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";
import slide1 from "../../assets/images/s1.jpg";
import slide2 from "../../assets/images/s2.jpg";
import slide3 from "../../assets/images/s3.jpg";
import stores from "../../assets/images/stores.png";
import coupon from "../../assets/images/copoun.png";
import categories from "../../assets/images/categories.png";
import ads from "../../assets/images/ads.png";
import onlineStore from "../../assets/images/onlineStore.png";
import wanted from "../../assets/images/storeWanted.png";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container p-0">
        <div className="row m-0 h-100">
          <div className="col-lg-7 col-12 p-2 h-100">
            <div className="swiper_adds">
              <Swiper
                slidesPerView={1}
                speed={1000}
                loop={true}
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="hero_slider"
              >
                <SwiperSlide>
                  <div className="slide">
                    <img src={slide1} alt="slide1" />
                    <div className="layer">
                      <h4>استكشف قطع غيار وإكسسواراتنا</h4>
                      <p>اكتشف أحدث القطع والإكسسوارات لتحسين سيارتك.</p>
                      <a href="shop.html">تسوق الآن</a>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="slide">
                    <img src={slide2} alt="slide1" />
                    <div className="layer">
                      <h4>استكشف قطع غيار وإكسسواراتنا</h4>
                      <p>اكتشف أحدث القطع والإكسسوارات لتحسين سيارتك.</p>
                      <a href="shop.html">تسوق الآن</a>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="slide">
                    <img src={slide3} alt="slide1" />
                    <div className="layer">
                      <h4>استكشف قطع غيار وإكسسواراتنا</h4>
                      <p>اكتشف أحدث القطع والإكسسوارات لتحسين سيارتك.</p>
                      <a href="shop.html">تسوق الآن</a>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          <div className="col-lg-5 col-12 p-2">
            <div className="categories">
              <Link
                to="/markets"
                className="category"
                style={{ backgroundColor: "#DE010121" }}
              >
                <h2>المتاجر</h2>
                <div className="img">
                  <img src={stores} alt="stores" />
                </div>
              </Link>

              <Link
                to="/coupons"
                className="category"
                style={{ backgroundColor: "#3FA21821" }}
              >
                <h2>الكوبونات</h2>
                <div className="img">
                  <img src={coupon} alt="stores" />
                </div>
              </Link>

              <Link
                to="/stores"
                className="category"
                style={{ backgroundColor: "#dd4bf829" }}
              >
                <h2>الإعلانات المطلوبه</h2>
                <div className="img">
                  <img src={wanted} alt="stores" />
                </div>
              </Link>

              <Link
                to="/stores"
                className="category"
                style={{ backgroundColor: "#23c98c4a" }}
              >
                <h2>المتاجر الالكترونيه</h2>
                <div className="img">
                  <img src={onlineStore} alt="stores" />
                </div>
              </Link>

              <Link
                to="/categories"
                className="category"
                style={{ backgroundColor: "#4B82F829" }}
              >
                <h2>التصنيفات</h2>
                <div className="img">
                  <img src={categories} alt="stores" />
                </div>
              </Link>

              <Link
                to="/ads"
                className="category"
                style={{ backgroundColor: "#F8CF734A" }}
              >
                <h2>الاعلانات</h2>
                <div className="img">
                  <img src={ads} alt="stores" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
